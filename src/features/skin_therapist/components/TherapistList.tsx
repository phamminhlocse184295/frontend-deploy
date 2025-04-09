import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  List,
  Spin,
  Input,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTherapists } from "../hooks/useGetTherapist";
import { useTherapistStore } from "../hooks/useTherapistStore";
import { useGetServiceByTherapistId } from "../../services/hooks/useGetServiceByTherapistId";
import { PagePath } from "../../../enums/page-path.enum";
import { TherapistDto } from "../dto/get-therapist.dto";

const { Title, Text } = Typography;
const { Option } = Select;

const SkinTherapistList = () => {
  const navigate = useNavigate();
  const {
    data: therapistData,
    isLoading: isLoadingTherapist,
    error: errorTherapist,
  } = useTherapists();
  const { setTherapists } = useTherapistStore();
  const [filteredTherapists, setFilteredTherapists] = useState<TherapistDto[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [experienceFilter, setExperienceFilter] = useState<number | null>(null);

  useEffect(() => {
    if (therapistData && !isLoadingTherapist && !errorTherapist) {
      setTherapists(therapistData);
      setFilteredTherapists(therapistData);
    }
  }, [therapistData, isLoadingTherapist, errorTherapist, setTherapists]);

  useEffect(() => {
    const filtered = therapistData?.filter((therapist: TherapistDto) => {
      const matchesSearch = therapist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const experienceInYears = parseInt(therapist.experience);
      const matchesExperience =
        experienceFilter !== null ? experienceInYears < experienceFilter : true;
      return matchesSearch && matchesExperience;
    });
    setFilteredTherapists(filtered || []);
  }, [searchTerm, experienceFilter, therapistData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setExperienceFilter(value === "All" ? null : parseInt(value, 10));
  };

  const handleNavigate = (skintherapistId: number) => {
    navigate(PagePath.SKIN_THERAPIST_DETAIL, { state: { skintherapistId } });
  };

  if (isLoadingTherapist) return <Spin size="large" />;
  if (errorTherapist) return <div>Không thể lấy danh sách chuyên viên</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "30px", color: "#6f4e37" }}
      >
        Chọn chuyên viên trị liệu da cho bạn
      </Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <Input
          placeholder="Tìm kiếm tên chuyên viên..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: 300 }}
        />
        <Select defaultValue="All" onChange={handleFilterChange}>
          <Option value="All">Tất cả</Option>
          <Option value="15">Dưới 15 năm</Option>
          <Option value="12">Dưới 12 năm</Option>
          <Option value="10">Dưới 10 năm</Option>
          <Option value="7">Dưới 7 năm</Option>
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {filteredTherapists.map((therapist: TherapistDto) => (
          <TherapistCard
            key={therapist.skintherapistId}
            therapist={therapist}
            handleNavigate={handleNavigate}
          />
        ))}
      </Row>
    </div>
  );
};

const TherapistCard = ({
  therapist,
  handleNavigate,
}: {
  therapist: TherapistDto;
  handleNavigate: (id: number) => void;
}) => {
  const {
    data: services,
    isLoading,
    isError,
  } = useGetServiceByTherapistId(therapist.skintherapistId);

  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        style={{ borderRadius: "10px", textAlign: "center" }}
        cover={
          <img
            alt={therapist.name}
            src={therapist.image}
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              objectFit: "cover",
              width: "50%",
              margin: "0 auto",
            }}
          />
        }
        actions={[
          <Button
            type="text"
            onClick={() => handleNavigate(therapist.skintherapistId)}
          >
            Thông tin chi tiết
          </Button>,
        ]}
      >
        <Title level={4}>{therapist.name}</Title>
        <Text strong>{therapist.expertise}</Text>
        <br />
        <Text type="secondary">Kinh nghiệm: {therapist.experience} năm</Text>
        <br />
        <Text type="secondary">Bằng cấp: {therapist.degree}</Text>
        <br />
        <Title level={5}>Dịch vụ chuyên viên làm:</Title>
        {isLoading ? (
          <Spin size="small" />
        ) : isError ? (
          <Text type="danger">Không thể tải dịch vụ</Text>
        ) : (
          <List
            size="small"
            dataSource={services}
            renderItem={(service: { name: string }) => (
              <List.Item>
                <Text>{service.name}</Text>
              </List.Item>
            )}
          />
        )}
      </Card>
    </Col>
  );
};

export default SkinTherapistList;
