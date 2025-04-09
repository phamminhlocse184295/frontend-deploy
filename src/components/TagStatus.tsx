import { Tag } from "antd";
import { Status } from "../enums/status-booking";
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

type TagStatusProps = {
  status: string;
  showLabel?: boolean;
};

const StatusTag = ({ status, showLabel = false }: TagStatusProps) => {
  const getStatusConfig = (
    status: string
  ): { color: string; label: string; icon: React.ReactNode } => {
    switch (status) {
      case Status.BOOKED:
        return {
          color: "blue",
          label: "Booked",
          icon: <BookOutlined style={{ marginRight: "4px" }} />,
        };
      case Status.FINISHED:
        return {
          color: "lime",
          label: "Finished",
          icon: <CheckOutlined style={{ marginRight: "4px" }} />,
        };
      case Status.CHECK_IN:
        return {
          color: "gold",
          label: "Check-In",
          icon: <ClockCircleOutlined style={{ marginRight: "4px" }} />,
        };
      case Status.COMPLETED:
        return {
          color: "green",
          label: "Completed",
          icon: <CheckCircleOutlined style={{ marginRight: "4px" }} />,
        };
      case Status.DENIED:
        return {
          color: "red",
          label: "Denied",
          icon: <CloseCircleOutlined style={{ marginRight: "4px" }} />,
        };
      case Status.CANCELLED:
        return {
          color: "error",
          label: "Cancelled",
          icon: <ExclamationCircleOutlined style={{ marginRight: "4px" }} />,
        };
      default:
        return {
          color: "",
          label: "",
          icon: "",
        };
    }
  };

  const { color, label, icon } = getStatusConfig(status);

  return (
    <Tag color={color}>
      {showLabel && icon}
      {label}
    </Tag>
  );
};

export default StatusTag;
