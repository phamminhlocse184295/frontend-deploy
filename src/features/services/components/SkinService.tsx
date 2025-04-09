import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Modal,
  Slider,
  Rate,
} from "antd";
import {
  FilterOutlined,
  // HeartOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useServices } from "../hooks/useGetService";
import { useServiceStore } from "../hooks/useServiceStore";
import { PagePath } from "../../../enums/page-path.enum";
import { ServiceDto } from "../dto/get-service.dto";
import axios from "axios";
import { SkintypeServiceDto } from "../../services/dto/skintype-service.dto";
import { useSkinTypes } from "../../skin_type/hooks/useGetSkin";
import { useQuery } from "@tanstack/react-query";
import { SkinDto } from "../../skin_type/dto/skin.dto";
// import { useSkintypeServiceByServiceId } from "../hooks/useGetSkintypeServiceByServiceId";

const { Title, Text } = Typography;
const { Option } = Select;

interface ServiceSkinType extends ServiceDto {
  skinTypeIds?: number[];
  skinTypeNames?: string;
}

const fetchSkinTypeByServiceId = async (
  serviceId: number
): Promise<number[]> => {
  try {
    console.log(`Fetching skin types for serviceId: ${serviceId}`);
    const response = await axios.get<SkintypeServiceDto[]>(
      `https://localhost:7071/getSkintypeServiceByServiceId/${serviceId}`
    );
    return response.data.map((item) => item.skintypeId) ?? [];
  } catch (error: unknown) {
    console.error(
      `Lỗi khi tải loại da cho serviceId ${serviceId}:`,
      error instanceof Error ? error.message : "Lỗi không xác định"
    );
    return [];
  }
};

const SkincareServices = () => {
  const navigate = useNavigate();
  const {
    data: serviceData,
    isLoading: isLoadingService,
    error: errorService,
  } = useServices();

  const { setServices } = useServiceStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const { data: skintypeServiceData = [] } = useSkintypeServiceByServiceId(
  //   serviceId ? serviceId.toString() : ""
  // );

  const { data: skinTypes } = useSkinTypes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<ServiceSkinType[]>([]);

  const { data: serviceSkinTypes } = useQuery<ServiceSkinType[]>({
    queryKey: ["serviceSkinTypes", serviceData],
    queryFn: async () => {
      if (!serviceData || !skinTypes) return [];
      const activeServices = serviceData.filter(
        (service) => service.status === "Active" // Lọc chỉ các service có status "Active"
      );
      return await Promise.all(
        activeServices.map(async (service) => {
          const skinData = await fetchSkinTypeByServiceId(service.serviceId);
          const matchedSkinTypes = skinTypes.filter((st) =>
            skinData.includes(st.skintypeId)
          );
          return {
            ...service,
            skinTypeIds: skinData,
            skinTypeNames: matchedSkinTypes.length
              ? matchedSkinTypes.map((st) => st.skintypeName).join(", ")
              : "Không xác định",
          } as ServiceSkinType;
        })
      );
    },
    enabled: !!serviceData && !!skinTypes,
  });
  // const handleNavigate = (serviceId: number) => {
  //   navigate(`/Homepage/Service/${serviceId}`);
  // };
  const handleNavigate = (serviceId: number) => {
    navigate(PagePath.SKIN_SERVICE_DETAIL, {
      state: {
        serviceId: serviceId,
      },
    });
  };

  useEffect(() => {
    if (searchTerm && serviceSkinTypes) {
      const filtered = serviceSkinTypes.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else if (serviceSkinTypes) {
      setFilteredData(serviceSkinTypes);
    }
  }, [searchTerm, serviceSkinTypes]);

  useEffect(() => {
    if (serviceSkinTypes) {
      setServices(serviceSkinTypes);
      setFilteredData(serviceSkinTypes);
    }
  }, [serviceSkinTypes, setServices]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (serviceData && !isLoadingService && !errorService) {
      setServices(serviceData);
    }
  }, [serviceData, isLoadingService, errorService, setServices]);

  return (
    <div style={{ padding: "20px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "30px", color: "#6f4e37" }}
      >
        Dịch Vụ Chăm Sóc Da Chuyên Nghiệp
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
          placeholder="Tìm kiếm dịch vụ..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: 300 }}
        />
        <div className="filter-container">
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Bộ lọc
          </Button>
        </div>
      </div>
      <Row gutter={[16, 16]} justify="start">
        {filteredData?.map((service) => (
          <Col
            key={service.serviceId}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ display: "flex" }}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={service.name}
                  src={service.image}
                  style={{ height: 222 }}
                />
              }
              actions={[
                // <Button type="text" icon={<HeartOutlined />} key="wishlist">
                //   Yêu thích
                // </Button>,
                <Button
                  type="primary"
                  icon={<InfoCircleFilled />}
                  key="book"
                  style={{ background: "#af8d70" }}
                  onClick={() => handleNavigate(service.serviceId)}
                >
                  Chi tiết
                </Button>,
              ]}
              style={{
                width: "-webkit-fill-available",
              }}
            >
              <Title level={4}>{service.name}</Title>
              <Text style={{ display: "block" }}>{service.description}</Text>
              <Text>Loại da: {service.skinTypeNames}</Text>
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#fa541c",
                }}
              >
                {service.price.toLocaleString()}
              </div>
              <div style={{ marginTop: "10px" }}>
                <Text>Đánh giá: </Text>
                <Rate disabled allowHalf value={service.averageStars} />
                <Text style={{ marginLeft: 8 }}>({service.averageStars})</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Bộ lọc"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          let filtered = serviceSkinTypes || [];
          filtered = filtered.filter(
            (service) =>
              service.price >= priceRange[0] && service.price <= priceRange[1]
          );
          if (selectedSkinType !== null) {
            filtered = filtered.filter((service) =>
              service.skinTypeIds?.includes(selectedSkinType)
            );
          }
          setFilteredData(filtered);
          setIsModalOpen(false);
        }}
      >
        <Title level={4}>Lọc theo giá</Title>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
        />

        <Title level={4} style={{ marginTop: "16px" }}>
          Lọc theo loại da
        </Title>
        <Select
          placeholder="Chọn loại da"
          allowClear
          style={{ width: "100%" }}
          value={selectedSkinType}
          onChange={(value) => setSelectedSkinType(value)}
        >
          {skinTypes?.map((skin: SkinDto) => (
            <Option key={skin.skintypeId} value={skin.skintypeId}>
              {skin.skintypeName ?? `Loại da ${skin.skintypeId}`}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default SkincareServices;
