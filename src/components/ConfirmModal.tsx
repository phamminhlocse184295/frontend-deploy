import { Modal, message } from "antd";

interface ActionConfirmModalProps {
  action: "checkin" | "checkout" | "cancel" | "deny" | "finish";
  bookingId: number;
  onConfirm: (bookingId: number) => Promise<void>;
}

export const showActionConfirmModal = ({
  action,
  bookingId,
  onConfirm,
}: ActionConfirmModalProps) => {
  let title = "";
  let content = "";
  let successMessage = "";
  let errorMessage = "";

  switch (action) {
    case "checkin":
      title = "Xác nhận Check-in";
      content = "Bạn có chắc chắn muốn check-in cho khách hàng này không?";
      successMessage = "Khách hàng đã check-in thành công!";
      errorMessage = "Check-in thất bại, vui lòng thử lại!";
      break;
    case "checkout":
      title = "Xác nhận Check-out";
      content = "Bạn có chắc chắn muốn check-out cho khách hàng này không?";
      successMessage = "Khách hàng đã check-out thành công!";
      errorMessage = "Check-out thất bại, vui lòng thử lại!";
      break;
    case "cancel":
      title = "Xác nhận Hủy";
      content = "Bạn có chắc chắn muốn hủy đặt lịch này không?";
      successMessage = "Hủy đặt lịch thành công!";
      errorMessage = "Hủy đặt lịch thất bại, vui lòng thử lại!";
      break;
    case "deny":
      title = "Xác nhận Từ chối thanh toán";
      content =
        "Bạn có chắc chắn muốn từ chối thanh toán cho lịch hẹn này không?";
      successMessage = "Từ chối thanh toán thành công!";
      errorMessage = "Từ chối thanh toán thất bại, vui lòng thử lại!";
      break;
    case "finish":
      title = "Xác nhận hoàn thành dịch vụ";
      content = "Bạn có chắc chắn hoàn thành dịch vụ này không?";
      successMessage = "Hoàn thành dịch vụ thành công!";
      errorMessage = "Hoàn thành dịch vụ thất bại, vui lòng thử lại!";
      break;
    default:
      return;
  }

  Modal.confirm({
    title,
    content,
    okText: "Xác nhận",
    cancelText: "Hủy",
    async onOk() {
      try {
        await onConfirm(bookingId);
        message.success(successMessage);
      } catch {
        message.error(errorMessage);
      }
    },
    onCancel() {
      message.info("Hành động đã bị hủy.");
    },
  });
};
