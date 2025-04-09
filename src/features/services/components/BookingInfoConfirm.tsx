import { Card, Typography, Button, Descriptions, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";
import { useCreateBooking } from "../../booking/hooks/useCreateBooking";

const { Title, Text } = Typography;

const BookingInfoConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingMutation = useCreateBooking(); // ✅ Get mutation object
  const { mutate: createBooking, isPending } = bookingMutation; // ✅ Use correct property

  // ✅ Store booking details
  const [bookingDetails, setBookingDetails] = useState(location.state || null);

  useEffect(() => {
    if (!location.state) {
      const savedData = sessionStorage.getItem("bookingDetails");
      if (savedData) {
        setBookingDetails(JSON.parse(savedData));
      }
    } else {
      sessionStorage.setItem("bookingDetails", JSON.stringify(location.state));
    }
  }, [location.state]);

  console.log("🔍 BookingInfoConfirm - Received state:", bookingDetails);

  if (!bookingDetails) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger" style={{ fontSize: "18px", fontWeight: "bold" }}>
          ❌ Lỗi: Không tìm thấy thông tin đặt lịch!
        </Text>
      </div>
    );
  }

  const {
    serviceName,
    amount,
    selectedDate,
    selectedTime,
    therapistName,
    bookingLocation,
    customerId,
    selectedSlotId,
    selectedExpert,
    serviceId,
  } = bookingDetails;

  // ✅ Function to confirm booking (Send API request)
  const handleConfirm = () => {
    const bookingData = {
      customerId: customerId,
      location: bookingLocation,
      amount: amount,
      serviceId: serviceId,
      skintherapistId: selectedExpert,
      status: "",
      slotId: selectedSlotId,
    };

    console.log("📦 Sending Booking Data:", bookingData);

    createBooking(bookingData, {
      onSuccess: () => {
        message.success("Đặt lịch thành công!");
        navigate(PagePath.COMPLETE_RESULT); // ✅ Redirect to final success page
      },
      onError: (err: Error) => {
        console.error("❌ API Error:", err);
        message.error("Đặt lịch thất bại, vui lòng thử lại!");
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card
        title={
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Xác Nhận Thông Tin Đặt Lịch
          </Title>
        }
        bordered={false}
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="🛎️ Dịch vụ">
            {serviceName}
          </Descriptions.Item>
          <Descriptions.Item label="💰 Giá">{amount} VND</Descriptions.Item>
          <Descriptions.Item label="📅 Ngày">{selectedDate}</Descriptions.Item>
          <Descriptions.Item label="⏰ Giờ">{selectedTime}</Descriptions.Item>
          <Descriptions.Item label="👩‍⚕️ Chuyên viên">
            {therapistName}
          </Descriptions.Item>
          <Descriptions.Item label="📍 Địa điểm">
            {bookingLocation}
          </Descriptions.Item>
        </Descriptions>

        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center", marginTop: "20px" }}
        >
          <Button
            type="default"
            style={{
              borderRadius: "6px",
              padding: "8px 20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={() => navigate(-1)} // ✅ Go back
          >
            🔙 Quay lại
          </Button>

          <Button
            type="primary"
            style={{
              backgroundColor: "#1677ff",
              borderRadius: "6px",
              padding: "8px 20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={handleConfirm} // ✅ Now sends API request here
            loading={isPending} // ✅ Show loading if API is in progress
          >
            ✅ Xác nhận
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default BookingInfoConfirm;
