import {
  Card,
  Typography,
  Row,
  Col,
  Image,
  Divider,
  Spin,
  List,
  Badge,
  Calendar,
  Flex,
} from "antd";
import { useLocation } from "react-router-dom";
import { useTherapistById } from "../hooks/useGetTherapistId";
import { useGetServiceByTherapistId } from "../../services/hooks/useGetServiceByTherapistId";
import { useGetScheduleByTherapistId } from "../../schedule/hooks/useGetScheduleByTherapistId";
import { useSlots } from "../../services/hooks/useGetSlot";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { ScheduleDto } from "../../schedule/dto/schedule.dto";
import { SlotDto } from "../../services/dto/slot.dto";

const { Title, Text } = Typography;

const SkinTherapistDetail = () => {
  const location = useLocation();
  const { skintherapistId } = location.state || {};

  // Lấy thông tin chuyên viên
  const {
    data: therapist,
    isLoading: therapistLoading,
    isError: therapistError,
  } = useTherapistById(skintherapistId || "");

  // Lấy các dịch vụ của chuyên viên
  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetServiceByTherapistId(skintherapistId || "");

  const { data: schedule, isLoading: loadingSchedule } =
    useGetScheduleByTherapistId(skintherapistId ?? 0);

  const { data: slots, isLoading: loadingSlots } = useSlots();

  const dateCellRender = (value: Dayjs) => {
    if (!schedule || !Array.isArray(schedule) || !slots) return null;

    const formattedDate = value.format("YYYY-MM-DD");

    const scheduleForTherapist = schedule.filter(
      (s: ScheduleDto) => s.skinTherapistId === skintherapistId
    );

    const slotsForDate = slots.filter((slot: SlotDto) => {
      return (
        scheduleForTherapist.some(
          (s: ScheduleDto) =>
            s.slotId === slot.slotId &&
            dayjs(slot.date).format("YYYY-MM-DD") === formattedDate
        ) && slot.status === "Available"
      );
    });

    slotsForDate.sort((a, b) =>
      dayjs(a.time, "HH:mm").isBefore(dayjs(b.time, "HH:mm")) ? -1 : 1
    );

    if (slotsForDate.length === 0) return null;

    const cellContent = (
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {slotsForDate.map((slot: SlotDto) => {
          return (
            <li key={slot.slotId} style={{ marginBottom: 4 }}>
              <Badge
                status="success"
                text={`${slot.time}`}
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              />
            </li>
          );
        })}
      </ul>
    );

    return (
      <>
        <div>{cellContent}</div>
      </>
    );
  };

  if (therapistLoading || servicesLoading || loadingSchedule || loadingSlots)
    return <Spin size="large" />;
  if (therapistError || !therapist)
    return <div>Không tìm thấy thông tin chuyên viên chăm sóc da</div>;
  if (servicesError)
    return <div>Không thể lấy danh sách dịch vụ của chuyên viên</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: 24,
        }}
      >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Image
              src={therapist.image}
              alt={therapist.name}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Title level={2}>{therapist.name}</Title>
            <Text>{therapist.speciality}</Text>
            <Divider />
            <Text strong>Email:</Text> {therapist.email}
            <Divider />
            <Text strong>Kinh nghiệm:</Text> {therapist.experience}
            <Divider />
            <Text strong>Bằng cấp:</Text> {therapist.degree}
            <Divider />
            <Title level={4}>Dịch vụ có thể thực hiện:</Title>
            <List
              dataSource={services}
              renderItem={(service) => (
                <List.Item>
                  <div>
                    <Text strong>{service.name}</Text> - {service.description}
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ margin: 86 }}>
        <Flex
          gap="middle"
          justify="center"
          style={{ fontSize: 28, fontWeight: 600 }}
        >
          Lịch làm việc của chuyên viên
        </Flex>
        <Calendar dateCellRender={dateCellRender} />
      </Card>
    </div>
  );
};

export default SkinTherapistDetail;
