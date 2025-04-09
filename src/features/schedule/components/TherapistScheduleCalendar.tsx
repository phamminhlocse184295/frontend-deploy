import { Calendar, Spin, Flex, Tooltip, Badge, Row } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useGetScheduleByTherapistId } from "../hooks/useGetScheduleByTherapistId";
import { useSlots } from "../../services/hooks/useGetSlot";
import { useBookingss } from "../../booking/hooks/useGetBooking";
import { ScheduleDto } from "../dto/schedule.dto";
import { useTherapists } from "../../skin_therapist/hooks/useGetTherapist";
import { SlotDto } from "../../services/dto/slot.dto";
// import { BookingDto } from "../../booking/dto/booking.dto";
import useAuthStore from "../../authentication/hooks/useAuthStore";
import { useMemo } from "react";

const TherapistScheduleView = () => {
  const { user } = useAuthStore();
  const accountId = user?.accountId;
  const { data: therapists, isLoading: loadingTherapists } = useTherapists();

  const skintherapistId = useMemo(() => {
    if (!therapists || therapists.length === 0 || !accountId) return undefined;

    const therapist = therapists.find(
      (t) => Number(t.accountId) === Number(accountId)
    );

    return therapist?.skintherapistId;
  }, [therapists, accountId]);

  const { data: schedule, isLoading: loadingSchedule } =
    useGetScheduleByTherapistId(skintherapistId ?? 0);

  const { data: slots, isLoading: loadingSlots } = useSlots();
  const { data: bookings, isLoading: loadingBookings } = useBookingss();

  const dateCellRender = (value: Dayjs) => {
    if (!schedule || !Array.isArray(schedule) || !slots || !bookings)
      return null;

    const formattedDate = value.format("YYYY-MM-DD");

    const scheduleForTherapist = schedule.filter(
      (s: ScheduleDto) => s.skinTherapistId === skintherapistId
    );

    const slotsForDate = slots.filter((slot: SlotDto) => {
      return scheduleForTherapist.some(
        (s: ScheduleDto) =>
          s.slotId === slot.slotId &&
          dayjs(slot.date).format("YYYY-MM-DD") === formattedDate
      );
    });

    slotsForDate.sort((a, b) =>
      dayjs(a.time, "h:mm A").isBefore(dayjs(b.time, "h:mm A")) ? -1 : 1
    );

    if (slotsForDate.length === 0) return null;

    const tooltipContent = (
      <ul>
        {slotsForDate.map((slot: SlotDto) => {
          const booking = bookings.find((b) => b.bookingId === slot.bookingId);
          return (
            <li key={slot.slotId}>
              {slot.time} - {booking ? booking.serviceName : "Trống"}
            </li>
          );
        })}
      </ul>
    );

    const cellContent = (
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {slotsForDate.map((slot: SlotDto) => {
          // const booking = bookings.find((b) => b.bookingId === slot.bookingId);
          return (
            <li key={slot.slotId} style={{ marginBottom: 4 }}>
              <Badge
                status={slot.status === "Booked" ? "error" : "success"}
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
      <Tooltip title={tooltipContent} placement="top">
        <div>{cellContent}</div>
      </Tooltip>
    );
  };

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Lịch làm việc của chuyên viên</div>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Row style={{ gap: 30 }}>
        <Badge status="error" text="Đã đặt" />
        <Badge status="success" text="Lịch trống" />
      </Row>

      {loadingSchedule ||
      loadingSlots ||
      loadingBookings ||
      loadingTherapists ? (
        <Spin size="large" />
      ) : (
        <Calendar dateCellRender={dateCellRender} />
      )}
    </div>
  );
};

export default TherapistScheduleView;
