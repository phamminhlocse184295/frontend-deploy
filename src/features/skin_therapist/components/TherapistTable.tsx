/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Input as AntInput,
  Button,
  Modal,
  Flex,
  Image,
  Skeleton,
  Empty,
  Tooltip,
  Descriptions,
} from "antd";
import { useTherapists } from "../hooks/useGetTherapist";
import { useTherapistStore } from "../hooks/useTherapistStore";
import { EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useTherapistById } from "../hooks/useGetTherapistId";
import { ColumnsType } from "antd/es/table";
import { TherapistDto } from "../dto/get-therapist.dto";

const TherapistTable = () => {
  const { data, isLoading, error } = useTherapists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(
    null
  );
  const { therapists, setTherapists } = useTherapistStore();
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    if (data) {
      setTherapists(data);
    }
  }, [data, setTherapists]);

  const { data: therapistDetail, isLoading: isDetailLoading } =
    useTherapistById(selectedTherapistId || "");

  const handleViewDetails = (skintherapistId: string) => {
    setSelectedTherapistId(skintherapistId);
    setIsModalOpen(true);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const filteredTherapists = therapists?.filter((therapist: any) =>
    therapist.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<TherapistDto> = [
    {
      title: "No",
      dataIndex: "No",
      fixed: "left",
      width: 50,
      render: (_value, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "ID",
      dataIndex: "skintherapistId",
      key: "skintherapistId",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chuyên môn",
      dataIndex: "speciality",
      key: "speciality",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          src={image}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: unknown, record: TherapistDto) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                handleViewDetails(record.skintherapistId.toString())
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading therapists</div>;
  }

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách chuyên viên</div>
        <Button type="primary" icon={<PlusOutlined />}>
          Tạo chuyên viên
        </Button>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <AntInput
          prefix={<SearchOutlined />}
          placeholder="Nhập tên chuyên viên cần tìm"
          style={{ border: "none", backgroundColor: "transparent" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <hr style={{ opacity: 0.1 }} />
      <Table
        dataSource={filteredTherapists || []}
        columns={columns}
        rowKey="skintherapistId"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
        }}
      />

      <Modal
        title="Thông tin chi tiết chuyên viên"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        centered
      >
        {isDetailLoading ? (
          <Skeleton />
        ) : therapistDetail ? (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="ID">
              {therapistDetail.skintherapistId}
            </Descriptions.Item>
            <Descriptions.Item label="Tên">
              {therapistDetail.name}
            </Descriptions.Item>
            <Descriptions.Item label="Chuyên môn">
              {therapistDetail.speciality}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {therapistDetail.email}
            </Descriptions.Item>
            <Descriptions.Item label="Kinh nghiệm">
              {therapistDetail.experience}
            </Descriptions.Item>
            <Descriptions.Item label="Bằng cấp">
              {therapistDetail.degree}
            </Descriptions.Item>
            <Descriptions.Item label="Account ID">
              {therapistDetail.accountId}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh">
              <Image
                src={therapistDetail.image}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty />
        )}
      </Modal>
    </div>
  );
};

export default TherapistTable;
