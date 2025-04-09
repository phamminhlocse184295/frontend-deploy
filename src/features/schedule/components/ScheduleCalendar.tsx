import { useState } from "react";
import { Select, Calendar, Spin, Flex, Tooltip, Badge, Row } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useTherapists } from "../../skin_therapist/hooks/useGetTherapist";
import { useGetScheduleByTherapistId } from "../hooks/useGetScheduleByTherapistId";
import { useSlots } from "../../services/hooks/useGetSlot";
import { useBookingss } from "../../booking/hooks/useGetBooking";
// import { ScheduleDto } from "../dto/schedule.dto";
import { SlotDto } from "../../services/dto/slot.dto";
// import { BookingDto } from "../../booking/dto/booking.dto";

const TherapistScheduleView = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );
  const { data: therapists, isLoading: loadingTherapists } = useTherapists();
  const { data: schedule, isLoading: loadingSchedule } =
    useGetScheduleByTherapistId(
      selectedTherapist ? parseInt(selectedTherapist) : 0
    );
  const { data: slots, isLoading: loadingSlots } = useSlots();
  const { data: bookings, isLoading: loadingBookings } = useBookingss();

  const onSelectTherapist = (value: string) => {
    setSelectedTherapist(value);
  };

  // const dateCellRender = (value: Dayjs) => {
  //   if (!schedule || !Array.isArray(schedule) || !slots || !bookings)
  //     return null;
  //   const formattedDate = value.format("YYYY-MM-DD");
  //   const scheduleForTherapist = schedule.filter(
  //     (s) => s.skinTherapistId.toString() === selectedTherapist
  //   );

  //   const bookedSlots = slots.filter(
  //     (slot: SlotDto) => slot.status === "Booked"
  //   );

  //   const slotMap = new Map(bookedSlots.map((slot) => [slot.slotId, slot]));

  //   const bookingsForDate = bookings.filter((booking: BookingDto) => {
  //     return scheduleForTherapist.some((s: ScheduleDto) => {
  //       // const slot = slots.find((slot: SlotDto) => slot.slotId === s.slotId);
  //       const slot = slotMap.get(s.slotId);
  //       return (
  //         slot &&
  //         slot.bookingId === booking.bookingId &&
  //         dayjs(booking.date).format("YYYY-MM-DD") === formattedDate
  //       );
  //     });
  //   });

  //   const tooltipContent = (
  //     <ul>
  //       {bookingsForDate.map((booking: BookingDto) => {
  //         // const slot = slots.find(
  //         //   (slot: SlotDto) => slot.bookingId === booking.bookingId
  //         // );
  //         const slot = bookedSlots.find(
  //           (s) => s.bookingId === booking.bookingId
  //         );
  //         return (
  //           <li key={booking.bookingId}>
  //             {slot ? slot.time : ""} - {booking.serviceName}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );

  //   const cellContent = (
  //     <div>
  //       {bookingsForDate.map((booking: BookingDto) => {
  //         const slot = bookedSlots.find(
  //           (s) => s.bookingId === booking.bookingId
  //         );
  //         return (
  //           <Badge
  //             status="error"
  //             text={slot ? slot.time : ""}
  //             key={booking.bookingId}
  //             style={{ width: "-webkit-fill-available", textAlign: "center" }}
  //           />
  //         );
  //       })}
  //     </div>
  //   );

  //   return (
  //     <Tooltip title={tooltipContent} placement="top">
  //       <div>{cellContent}</div>
  //     </Tooltip>
  //   );

  //   // return (
  //   //   <ul>
  //   //     {bookingsForDate.map((booking: BookingDto) => {
  //   //       const slot = slots.find(
  //   //         (slot: SlotDto) => slot.bookingId === booking.bookingId
  //   //       );
  //   //       return (
  //   //         <li key={booking.bookingId}>
  //   //           {slot ? slot.time : ""}
  //   //           {/* - {booking.serviceName} */}
  //   //         </li>
  //   //       );
  //   //     })}
  //   //   </ul>
  //   // );
  // };
  const dateCellRender = (value: Dayjs) => {
    if (!schedule || !Array.isArray(schedule) || !slots || !bookings)
      return null;

    const formattedDate = value.format("YYYY-MM-DD");

    const scheduleForTherapist = schedule.filter(
      (s) =>
        s.skinTherapistId.toString() === selectedTherapist &&
        dayjs(s.date).format("YYYY-MM-DD") === formattedDate
    );

    const slotsForDate = scheduleForTherapist
      .map((s) => slots.find((slot) => slot.slotId === s.slotId))
      .filter(Boolean) as SlotDto[];

    slotsForDate.sort((a, b) =>
      dayjs(a.time, "h:mm A").isBefore(dayjs(b.time, "h:mm A")) ? -1 : 1
    );

    const slotBookingMap = new Map(
      bookings.map((b) => [b.bookingId, b.serviceName])
    );

    const tooltipContent = (
      <ul>
        {slotsForDate.map((slot) => {
          const serviceName = slotBookingMap.get(slot.bookingId) || "";
          return (
            <li key={slot.slotId}>
              {slot.time} - {serviceName}
            </li>
          );
        })}
      </ul>
    );

    const cellContent = (
      <div>
        {slotsForDate.map((slot) => {
          const badgeStatus: "error" | "success" =
            slot.status === "Booked" ? "error" : "success";

          return (
            <Badge
              status={badgeStatus}
              text={`${slot.time}`}
              key={slot.slotId}
              style={{
                width: "100%",
                textAlign: "center",
                display: "block",
                marginBottom: 4,
              }}
            />
          );
        })}
      </div>
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
      <Select
        placeholder="Chọn chuyên viên"
        style={{ width: "100%", marginBottom: 20 }}
        loading={loadingTherapists}
        onChange={onSelectTherapist}
      >
        {therapists?.map((therapist) => (
          <Select.Option
            key={therapist.skintherapistId}
            value={therapist.skintherapistId.toString()}
          >
            {therapist.name}
          </Select.Option>
        ))}
      </Select>
      <Row style={{ gap: 30 }}>
        <Badge status="error" text="Đã đặt" />
        <Badge status="success" text="Lịch trống" />
      </Row>

      {loadingSchedule || loadingSlots || loadingBookings ? (
        <Spin size="large" />
      ) : (
        <Calendar dateCellRender={dateCellRender} />
      )}
    </div>
  );
};

export default TherapistScheduleView;
