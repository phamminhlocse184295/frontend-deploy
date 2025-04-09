import { Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { showActionConfirmModal } from "./ConfirmModal";
import { Status } from "../enums/status-booking";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
import { RoleCode } from "../enums/role.enum";

type ActionButtonsProps = {
  status: string;
  bookingId: number;
  onCheckIn?: (bookingId: number) => Promise<void>;
  onCancelled?: (bookingId: number) => Promise<void>;
  onCompleted?: (bookingId: number) => Promise<void>;
  onFinished?: (bookingId: number) => Promise<void>;
  onDenied?: (bookingId: number) => Promise<void>;
};

const ActionButtons = ({
  status,
  bookingId,
  onCheckIn,
  onCancelled,
  onCompleted,
  onFinished,
  onDenied,
}: ActionButtonsProps) => {
  const { user } = useAuthStore();

  const handleCheckIn = () => {
    if (onCheckIn) {
      showActionConfirmModal({
        action: "checkin",
        bookingId,
        onConfirm: onCheckIn,
      });
    }
  };

  const handleCancelled = () => {
    if (onCancelled) {
      showActionConfirmModal({
        action: "cancel",
        bookingId,
        onConfirm: onCancelled,
      });
    }
  };

  const handleCompleted = () => {
    if (onCompleted) {
      showActionConfirmModal({
        action: "checkout",
        bookingId,
        onConfirm: onCompleted,
      });
    }
  };

  const handleDenied = () => {
    if (onDenied) {
      showActionConfirmModal({
        action: "deny",
        bookingId,
        onConfirm: onDenied,
      });
    }
  };

  const handleFinished = () => {
    if (onFinished) {
      showActionConfirmModal({
        action: "finish",
        bookingId,
        onConfirm: onFinished,
      });
    }
  };

  switch (status) {
    case Status.BOOKED:
      return (
        user?.role === RoleCode.STAFF && (
          <>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              style={{ marginRight: 10 }}
              onClick={handleCheckIn}
            >
              Check-in
            </Button>
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={handleCancelled}
            >
              Hủy lịch đặt
            </Button>
          </>
        )
      );

    case Status.CHECK_IN:
      return (
        user?.role === RoleCode.THERAPIST && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleFinished}
          >
            Hoàn thành dịch vụ
          </Button>
        )
      );

    case Status.FINISHED:
      return (
        user?.role === RoleCode.STAFF && (
          <>
            <Button
              style={{ marginRight: 10 }}
              icon={<PayCircleOutlined />}
              onClick={handleCompleted}
            >
              Xác nhận thanh toán
            </Button>
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={handleDenied}
            >
              Hủy thanh toán
            </Button>
          </>
        )
      );

    case "COMPLETED":
    case "DENIED":
    case "CANCELLED":
      return null;

    default:
      return null;
  }
};

export default ActionButtons;
