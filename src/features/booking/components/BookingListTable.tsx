/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Tooltip, Flex, Tabs } from "antd";
import {
  // CheckCircleOutlined,
  // CloseCircleOutlined,
  EditOutlined,
  // PayCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useBookings } from "../hooks/useGetBooked";
import { useBookingss } from "../hooks/useGetBooking";
import { useBookingStore } from "../hooks/useBookedStore";
// import { useCheckInBooking } from "../hooks/useCheckInBooking";
// import { useCompletedBooking } from "../hooks/useCompletedBooking";
// import { useCancelledBooking } from "../hooks/useCancelledBooking";
// import { useDeniedBooking } from "../hooks/useDeniedBooking";
import { Status } from "../../../enums/status-booking";
// import { showActionConfirmModal } from "../../../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { BookingDto } from "../dto/booking.dto";
import { ColumnsType } from "antd/es/table";
import StatusTag from "../../../components/TagStatus";
import useAuthStore from "../../authentication/hooks/useAuthStore";
import { RoleCode } from "../../../enums/role.enum";
import { useTherapists } from "../../skin_therapist/hooks/useGetTherapist";
import { TherapistDto } from "../../skin_therapist/dto/get-therapist.dto";
import { useCustomers } from "../../user/hook/useGetCustomer";
import { CustomerDto } from "../../user/dto/customer.dto";
import { PagePath } from "../../../enums/page-path.enum";
import { SlotDto } from "../../services/dto/slot.dto";
import { useSlots } from "../../services/hooks/useGetSlot";

const BookingListTable = () => {
  const {
    data: bookingData,
    isLoading: isLoadingBooking,
    error: errorBooking,
  } = useBookingss();

  const {
    data: bookedData,
    isLoading: isLoadingBooked,
    error: errorBooked,
    // refetch: refetchBooked,
  } = useBookings(Status.BOOKED);

  const {
    data: finishedData,
    isLoading: isLoadingFinished,
    error: errorFinished,
    // refetch: refetchFinished,
  } = useBookings(Status.FINISHED);

  const {
    data: checkInData,
    isLoading: isLoadingCheckIn,
    error: errorCheckIn,
  } = useBookings(Status.CHECK_IN);

  const {
    data: cancelledData,
    isLoading: isLoadingCancelled,
    error: errorCancelled,
  } = useBookings(Status.CANCELLED);

  const {
    data: deniedData,
    isLoading: isLoadingDenied,
    error: errorDenied,
  } = useBookings(Status.DENIED);

  const {
    data: completedData,
    isLoading: isLoadingCompleted,
    error: errorCompleted,
  } = useBookings(Status.COMPLETED);

  const { data: therapistData } = useTherapists();
  const { data: customerData } = useCustomers();

  const { setBookings } = useBookingStore();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [activeTab, setActiveTab] = useState("all");
  const { data: slots } = useSlots();
  const { user } = useAuthStore();
  const accountId = user?.accountId;

  const skintherapistId = useMemo(() => {
    if (!therapistData || therapistData.length === 0 || !accountId)
      return undefined;

    const therapist = therapistData.find(
      (t) => Number(t.accountId) === Number(accountId)
    );

    return therapist?.skintherapistId;
  }, [therapistData, accountId]);

  const filteredBookings = useMemo(() => {
    if (!bookingData || !skintherapistId) return bookingData;
    return bookingData.filter(
      (booking) => booking.skintherapistId === skintherapistId
    );
  }, [bookingData, skintherapistId]);

  const therapistMap = new Map<number, TherapistDto>();
  if (therapistData) {
    therapistData.forEach((therapist) => {
      therapistMap.set(therapist.skintherapistId, therapist);
    });
  }

  const customerMap = new Map<number, CustomerDto>();
  if (customerData) {
    customerData.forEach((customer) => {
      customerMap.set(customer.customerId, customer);
    });
  }

  const slotMap = new Map<number, SlotDto>();
  if (slots) {
    slots.forEach((slot: SlotDto) => {
      slotMap.set(slot.bookingId, slot);
    });
  }

  useEffect(() => {
    if (bookingData && !isLoadingBooking && !errorBooking) {
      setBookings(bookingData);
    }
    if (bookedData && !isLoadingBooked && !errorBooked) {
      setBookings(bookedData);
    }
    if (finishedData && !isLoadingFinished && !errorFinished) {
      setBookings(finishedData);
    }
    if (checkInData && !isLoadingCheckIn && !errorCheckIn) {
      setBookings(checkInData);
    }
    if (deniedData && !isLoadingDenied && !errorDenied) {
      setBookings(deniedData);
    }
    if (completedData && !isLoadingCompleted && !errorCompleted) {
      setBookings(completedData);
    }
    if (cancelledData && !isLoadingCancelled && !errorCancelled) {
      setBookings(cancelledData);
    }
  }, [
    bookingData,
    isLoadingBooking,
    errorBooking,
    bookedData,
    isLoadingBooked,
    errorBooked,
    finishedData,
    isLoadingFinished,
    errorFinished,
    checkInData,
    isLoadingCheckIn,
    errorCheckIn,
    completedData,
    isLoadingCompleted,
    errorCompleted,
    deniedData,
    isLoadingDenied,
    errorDenied,
    cancelledData,
    isLoadingCancelled,
    errorCancelled,
    setBookings,
  ]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleNavigate = (bookingId: number) => {
    navigate(PagePath.BOOKING_DETAIL, {
      state: {
        bookingId: bookingId,
      },
    });
  };

  const columns: ColumnsType<BookingDto> = [
    {
      title: "No",
      dataIndex: "No",
      fixed: "left",
      width: 50,
      render: (_value: any, _record: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Mã Booking",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Ngày đặt làm",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: BookingDto) => {
        const formattedDate = dayjs(text).format("DD/MM/YYYY");
        const slotTime = slotMap.get(record.bookingId)?.time;
        return `${formattedDate}${slotTime ? ` - ${slotTime}` : ""}`;
      },
      sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId: number) => {
        const customer = customerMap.get(customerId);
        return customer ? customer.name : customerId;
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Chuyên viên",
      dataIndex: "skintherapistId",
      key: "skintherapistId",
      render: (therapistId: number) => {
        const therapist = therapistMap.get(therapistId);
        return therapist ? therapist.name : therapistId;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusTag status={status} />,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: unknown, record: { bookingId: number; status: string }) => (
        <Space>
          {/* {record.status === Status.BOOKED && (
            <Tooltip title="Check-in">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "checkin",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("checkin", bookingId),
                  })
                }
              />
            </Tooltip>
          )}
          {record.status === Status.FINISHED && (
            <Tooltip title="Không thanh toán">
              <Button
                icon={<PayCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "deny",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("deny", bookingId),
                  })
                }
              />
            </Tooltip>
          )} */}
          <Tooltip title="Chi tiết">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleNavigate(record.bookingId)}
            />
          </Tooltip>
          {/* {record.status === Status.BOOKED && (
            <Tooltip title="Hủy">
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "cancel",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("cancel", bookingId),
                  })
                }
              />
            </Tooltip>
          )} */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách đặt lịch</div>
      </Flex>
      <hr style={{ opacity: 0.1 }} />

      {user?.role == RoleCode.STAFF ? (
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Tất cả" key="all">
            <Table
              dataSource={bookingData}
              columns={columns}
              loading={isLoadingBooking}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã đặt" key="booked">
            <Table
              dataSource={bookedData}
              columns={columns}
              loading={isLoadingBooked}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hoàn thành làm dịch vụ" key="finished">
            <Table
              dataSource={finishedData}
              columns={columns}
              loading={isLoadingFinished}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã check-in" key="checkIn">
            <Table
              dataSource={checkInData}
              columns={columns}
              loading={isLoadingCheckIn}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy" key="cancelled">
            <Table
              dataSource={cancelledData}
              columns={columns}
              loading={isLoadingCancelled}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy thanh toán" key="denied">
            <Table
              dataSource={deniedData}
              columns={columns}
              loading={isLoadingDenied}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hoàn thành thanh toán" key="completed">
            <Table
              dataSource={completedData}
              columns={columns}
              loading={isLoadingCompleted}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Table
          dataSource={filteredBookings}
          columns={columns}
          loading={isLoadingCheckIn}
          rowKey="bookingId"
          bordered
          onChange={handleTableChange}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default BookingListTable;
