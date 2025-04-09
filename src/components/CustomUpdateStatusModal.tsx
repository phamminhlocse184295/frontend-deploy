import { Button, Image, Modal, Typography } from "antd";
import IC_INFO_CIRCLE from "../assets/iCircleIcon.png";
import IC_CLOSE_CIRCLE from "../assets/xCircleIcon.png";

type Custom = "blue" | "red";

export interface CustomUpdateStatusModalProps {
  custom?: Custom;
  isOpen?: boolean;
  title?: string;
  subTitle?: string[];
  textClose?: string;
  textConfirm?: string;
  handleClose?: () => void;
  handleConfirm?: () => void;
}

export default function CustomUpdateStatusModal(
  props: CustomUpdateStatusModalProps
) {
  const {
    custom,
    isOpen,
    textClose,
    subTitle,
    title,
    handleClose,
    handleConfirm,
  } = props;

  let topIconString = "";
  let buttonText = "";
  let confirmButtonStyle = {};

  switch (custom) {
    case "blue":
      topIconString = IC_INFO_CIRCLE;
      confirmButtonStyle = { backgroundColor: "#366ae2", color: "#fff" };
      buttonText = "Bật";
      break;
    case "red":
      topIconString = IC_CLOSE_CIRCLE;
      confirmButtonStyle = { backgroundColor: "#e14337", color: "#fff" };
      buttonText = "Tắt";
      break;
  }

  return (
    <Modal
      open={isOpen}
      footer={null}
      centered
      width={414}
      className="[&_.ant-modal-close]:hidden [&_.ant-modal-content]:py-6"
      onCancel={handleClose}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="h-[72px] w-[72px]">
          <Image preview={false} src={topIconString} />
        </div>
        <Typography style={{ fontSize: 21, fontWeight: 600, margin: 10 }}>
          {title}
        </Typography>
        {subTitle?.map((subString, index) => (
          <Typography key={index} style={{ textAlign: "center" }}>
            {subString}
          </Typography>
        ))}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "24px",
            width: "100%",
          }}
        >
          <Button
            style={{
              backgroundColor: "#f5f5f5",
              color: "#595959",
              height: "40px",
              width: "50%",
              border: "none",
            }}
            onClick={handleClose}
          >
            {textClose}
          </Button>
          <Button
            style={{
              ...confirmButtonStyle,
              height: "40px",
              width: "50%",
              border: "none",
            }}
            onClick={handleConfirm}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
