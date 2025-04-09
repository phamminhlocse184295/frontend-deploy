/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Calendar,
  Button,
  message,
  Modal,
  Avatar,
} from "antd";
import {
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  SolutionOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useTherapists } from "../../skin_therapist/hooks/useGetTherapist";
import useAuthStore from "../../authentication/hooks/useAuthStore";
import { useAvailableSlot } from "../hooks/useAvailableSlot";
import utc from "dayjs/plugin/utc";
import { useCustomers } from "../../user/hook/useGetCustomer";
import { useGetScheduleByServiceId } from "../../schedule/hooks/useGetScheduleByServiceId";
import { useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";

dayjs.extend(utc);

const { Title, Text } = Typography;

const SkincareBooking = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const location = useLocation();
  const { user } = useAuthStore();
  const { data: therapists = [] } = useTherapists();
  const { data: availableSlots } = useAvailableSlot();
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const { data: customers, isLoading, error } = useCustomers();
  const { amount, serviceId, serviceName } = location.state || {};
  const { data: schedules } = useGetScheduleByServiceId(serviceId);
  const navigate = useNavigate();
  const [therapistModalVisible, setTherapistModalVisible] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);

  useEffect(() => {
    console.log("🛠️ Re-rendering: Selected Date changed:", selectedDate);
  }, [selectedDate]);

  if (isLoading) return <p>Loading ...</p>;
  if (error) {
    console.error("❌ Error fetching customers:", error);
    return <p>Error loading .</p>;
  }

  const getAvailableSlotsForTherapist = (therapistId: number) => {
    if (!schedules || !availableSlots) {
      console.warn("⚠️ No schedules or available slots found!");
      return [];
    }

    const flatSchedules = schedules.flat();

    const now = dayjs();
    const today = now.format("YYYY-MM-DD");

    return flatSchedules
      .filter((schedule) => {
        const scheduleDate = dayjs(schedule.date).format("YYYY-MM-DD");
        const isDateMatch = scheduleDate === selectedDate;
        const isTherapistMatch = schedule.skinTherapistId === therapistId;

        if (!schedule.slotId) {
          console.warn(`⚠️ Schedule missing slotId:`, schedule);
          return false;
        }

        const matchingSlot = availableSlots.find(
          (slot) =>
            slot.slotId === schedule.slotId && slot.status === "Available"
        );

        if (!matchingSlot) return false;

        if (scheduleDate === today) {
          const slotTime = dayjs(matchingSlot.time, ["h:mm A", "HH:mm"]);
          if (slotTime.isBefore(now)) {
            console.log(
              `⏳ Removing past slot ${matchingSlot.time} (ID: ${matchingSlot.slotId}) as it is before the current time.`
            );
            return false;
          }
        }

        return isDateMatch && isTherapistMatch && matchingSlot;
      })
      .map((schedule) => {
        const matchingSlot = availableSlots.find(
          (slot) =>
            slot.slotId === schedule.slotId && slot.status === "Available"
        );

        return matchingSlot
          ? {
              time: dayjs(matchingSlot.time, ["h:mm A", "HH:mm"]).format(
                "HH:mm"
              ),
              slotId: matchingSlot.slotId,
            }
          : null;
      })
      .filter((slot) => slot !== null)
      .sort((a, b) =>
        dayjs(a.time, "HH:mm").isBefore(dayjs(b.time, "HH:mm")) ? -1 : 1
      );
  };

  const handleSelectExpert = (id: number, time: string, slotId: number) => {
    setSelectedExpert(id);
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  dayjs.extend(utc);

  const handleConfirmBooking = () => {
    if (!selectedExpert || !selectedTime || !selectedSlotId) {
      message.warning("Vui lòng chọn chuyên viên, thời gian và slot!");
      return;
    }

    if (!user || !user.accountId) {
      message.error("Lỗi: Không tìm thấy thông tin tài khoản!");
      console.error("❌ User object is missing:", user);
      return;
    }

    if (!customers || customers.length === 0) {
      message.error("Lỗi: Danh sách khách hàng trống hoặc chưa tải xong!");
      console.error("❌ Customers not loaded or empty:", customers);
      return;
    }

    const matchedCustomer = customers.find(
      (c) => Number(c.accountId) === Number(user.accountId)
    );

    if (!matchedCustomer) {
      message.error("Lỗi: Không tìm thấy khách hàng phù hợp!");
      console.error("❌ No matching customer for accountId:", user.accountId);
      return;
    }

    if (!selectedSlotId) {
      message.error("Lỗi: Không tìm thấy slot đã chọn!");
      console.error("❌ Missing slotId:", selectedSlotId);
      return;
    }

    const selectedTherapist = therapists.find(
      (t) => t.skintherapistId === selectedExpert
    );
    const therapistName = selectedTherapist
      ? selectedTherapist.name
      : "Không rõ";

    navigate(PagePath.BOOKING_INFO_CONFIRM, {
      state: {
        serviceName: serviceName,
        amount: amount,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        therapistName: therapistName,
        bookingLocation: "HCM",
        customerId: matchedCustomer.customerId,
        selectedSlotId: selectedSlotId,
        selectedExpert: selectedExpert,
        serviceId: serviceId,
      },
    });
  };

  const handleOpenTherapistModal = (therapist: any) => {
    setSelectedTherapist(therapist);
    setTherapistModalVisible(true);
  };

  const handleCloseTherapistModal = () => {
    setTherapistModalVisible(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#F1EBE4",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#321414",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        Đặt Lịch Chăm Sóc Da
      </Title>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={18}>
          <Card
            title="Lịch làm việc"
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Calendar
              cellRender={(value) => {
                const isPast = value.isBefore(dayjs(), "day");
                return isPast ? null : (
                  <div style={{ paddingLeft: "5px" }}></div>
                );
              }}
              disabledDate={(current) => current.isBefore(dayjs(), "day")}
              onSelect={(value) => {
                const newDate = value.format("YYYY-MM-DD");
                console.log("📅 Selected Date:", newDate);
                setSelectedDate(newDate);
                setSelectedExpert(null);
                setSelectedTime("");
                setSelectedSlotId(null);
              }}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card
            title="Thông tin chuyên viên"
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {selectedDate ? (
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Ngày đã chọn: {selectedDate}
                </Text>
                <div style={{ marginTop: "20px" }}>
                  {therapists?.map((expert) => {
                    const availableTimes = getAvailableSlotsForTherapist(
                      expert.skintherapistId
                    );
                    if (availableTimes.length === 0) return null;

                    return (
                      <Card
                        key={expert.skintherapistId}
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#f9f9f9",
                          padding: "16px",
                          borderRadius: "12px",
                          transition: "all 0.3s ease-in-out",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        }}
                        hoverable
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onClick={() => handleOpenTherapistModal(expert)}
                      >
                        <Row justify="center" align="middle">
                          <Col span={24} style={{ textAlign: "center" }}>
                            <Title
                              level={4}
                              style={{ marginTop: "10px", color: "#321414" }}
                            >
                              {expert.name}
                            </Title>
                          </Col>
                        </Row>

                        <Row
                          gutter={[8, 8]}
                          justify="center"
                          style={{ marginTop: "10px" }}
                        >
                          {getAvailableSlotsForTherapist(
                            expert.skintherapistId
                          ).map(({ time, slotId }) => (
                            <Col
                              key={`${expert.skintherapistId}-${slotId}`}
                              xs={8}
                              sm={8}
                              md={8}
                            >
                              <Button
                                type="default"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleSelectExpert(
                                    expert.skintherapistId,
                                    time,
                                    slotId
                                  );
                                }}
                                style={{
                                  width: "100%",
                                  borderRadius: "20px",
                                  fontSize: "14px",
                                  padding: "8px 16px",
                                  backgroundColor:
                                    selectedExpert === expert.skintherapistId &&
                                    selectedTime === time
                                      ? "#8b4513"
                                      : "white",
                                  color:
                                    selectedExpert === expert.skintherapistId &&
                                    selectedTime === time
                                      ? "white"
                                      : "#321414",
                                  border: "1px solid #8b4513",
                                  cursor: "pointer",
                                }}
                              >
                                {time}
                              </Button>
                            </Col>
                          ))}
                        </Row>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Text style={{ color: "#888" }}>
                Vui lòng chọn ngày trên lịch để xem lịch làm việc.
              </Text>
            )}

            {selectedExpert && selectedTime && selectedSlotId && (
              <div style={{ marginTop: "20px" }}>
                <Title level={4}>Xác nhận đặt lịch</Title>
                <Text>
                  Bạn đã chọn{" "}
                  <strong>
                    {
                      therapists?.find(
                        (e) => e.skintherapistId === selectedExpert
                      )?.name
                    }
                  </strong>{" "}
                  vào lúc <strong>{selectedTime}</strong> ngày{" "}
                  <strong>{selectedDate}</strong>.
                </Text>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleConfirmBooking}
                    style={{
                      backgroundColor: "#8b4513",
                      border: "none",
                      fontSize: "16px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title={
          <Title level={3} style={{ margin: 0, color: "#321414" }}>
            Thông Tin Chuyên Viên
          </Title>
        }
        visible={therapistModalVisible}
        onCancel={handleCloseTherapistModal}
        footer={null}
        centered
      >
        {selectedTherapist && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            {/* Therapist Avatar & Info */}
            <Avatar
              size={100}
              src={selectedTherapist.image || "https://via.placeholder.com/100"}
              icon={!selectedTherapist.image && <UserOutlined />}
              style={{ marginBottom: "15px" }}
            />
            <Title level={4} style={{ color: "#321414" }}>
              {selectedTherapist.name}
            </Title>

            {/* Therapist Details */}
            <Row justify="center" style={{ marginTop: "15px" }}>
              <Col span={20}>
                <Card
                  style={{
                    background: "#F9F9F9",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <p>
                    <MailOutlined
                      style={{ marginRight: "8px", color: "#321414" }}
                    />{" "}
                    <strong>Email:</strong> {selectedTherapist.email}
                  </p>
                  <p>
                    <SolutionOutlined
                      style={{ marginRight: "8px", color: "#321414" }}
                    />{" "}
                    <strong>Kinh nghiệm:</strong> {selectedTherapist.experience}
                  </p>
                  <p>
                    <ReadOutlined
                      style={{ marginRight: "8px", color: "#321414" }}
                    />{" "}
                    <strong>Bằng cấp:</strong> {selectedTherapist.degree}
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SkincareBooking;
