// import { Card, Typography, Row, Col, Image, Button, Divider, Spin } from "antd";
// import { DollarOutlined } from "@ant-design/icons";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useServiceById } from "../hooks/useGetServiceId";
// import { PagePath } from "../../../enums/page-path.enum";

// const { Title, Text } = Typography;

// const ServiceDetail = () => {
//   const navigate = useNavigate();
//   // const { serviceId } = useParams();
//   const location = useLocation();
//   const { serviceId } = location.state || {};
//   const { data: service, isLoading, isError } = useServiceById(serviceId || "");

//   if (isLoading) {
//     return <Spin size="large" />;
//   }

//   if (isError || !service) {
//     return <div>Không tìm thấy người dùng</div>;
//   }

//   const handleNavigate = () => {
//     navigate(PagePath.BOOKING_SERVICE, {
//       state: {
//         amount: service.price,
//         serviceName: service.name,
//         serviceId: service.serviceId,
//       },
//     });
//   };

//   return (
//     <div style={{ padding: "20px", backgroundColor: "#FBFEFB" }}>
//       <Card
//         style={{
//           maxWidth: 1200,
//           margin: "20px auto",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         }}
//         bodyStyle={{ padding: 24 }}
//       >
//         <Row gutter={24}>
//           <Col xs={24} md={10}>
//             <Image
//               src={service.image}
//               alt={service.name}
//               style={{ borderRadius: 8 }}
//             />
//           </Col>
//           <Col xs={24} md={14}>
//             <Title level={2} style={{ marginBottom: 16 }}>
//               {service.name}
//             </Title>
//             <Text style={{ fontSize: 16, color: "#555" }}>
//               {service.description}
//             </Text>
//             <Divider />
//             <div style={{ marginBottom: 16 }}>
//               <DollarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
//               <Text strong>Giá:</Text> {service.price}
//             </div>
//             <Button
//               type="primary"
//               size="large"
//               style={{ marginTop: 20 }}
//               onClick={() => handleNavigate()}
//             >
//               Đặt lịch ngay
//             </Button>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default ServiceDetail;
import {
  Card,
  Typography,
  Row,
  Col,
  Image,
  Button,
  Divider,
  Spin,
  Tag,
  Rate,
} from "antd";
import { DollarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useServiceById } from "../hooks/useGetServiceId";
import { PagePath } from "../../../enums/page-path.enum";
import { useSkintypeServiceByServiceId } from "../hooks/useGetSkintypeServiceByServiceId";
import { useSkinTypes } from "../../skin_type/hooks/useGetSkin";

const { Title, Text } = Typography;

const ServiceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {};
  const { data: service, isLoading, isError } = useServiceById(serviceId || "");
  const { data: skintypeServiceData = [] } = useSkintypeServiceByServiceId(
    serviceId ? serviceId.toString() : ""
  );
  const { data: skinTypeData = [] } = useSkinTypes();

  const relatedSkintypes = Array.isArray(skintypeServiceData)
    ? (skintypeServiceData as { skintypeId: number }[])
        .map((skintypeService) =>
          skinTypeData.find(
            (skin) => skin.skintypeId === skintypeService.skintypeId
          )
        )
        .filter(Boolean)
    : [];

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !service) {
    return <div>Không tìm thấy dịch vụ</div>;
  }

  const handleNavigate = () => {
    navigate(PagePath.BOOKING_SERVICE, {
      state: {
        amount: service.price,
        serviceName: service.name,
        serviceId: service.serviceId,
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Image
              src={service.image}
              alt={service.name}
              style={{ borderRadius: 8, width: "100%" }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Title level={2} style={{ marginBottom: 16 }}>
              {service.name}
            </Title>
            <Text style={{ fontSize: 16, color: "#555" }}>
              {service.description}
            </Text>
            <Divider />
            <div style={{ marginBottom: 16 }}>
              <DollarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
              <Text strong>Giá:</Text> {service.price.toLocaleString()} VND
            </div>
            <div style={{ marginBottom: 16 }}>
              <ClockCircleOutlined
                style={{ color: "#1890ff", marginRight: 8 }}
              />
              <Text strong>Thời gian:</Text> {service.duration} phút
            </div>
            <Text>
              <Text strong>Loại da phù hợp với dịch vụ:</Text>
              {""}
              {relatedSkintypes
                .map((skin) => skin?.skintypeName)
                .filter(Boolean)
                .join(", ")}
            </Text>
            <div style={{ marginTop: "10px" }}>
              <Text strong>Đánh giá: </Text>
              <Rate disabled allowHalf value={service.averageStars} />
              <Text style={{ marginLeft: 8 }}>({service.averageStars})</Text>
            </div>
            <Divider />
            <Title level={4} style={{ marginBottom: 12 }}>
              Quy trình dịch vụ
            </Title>
            <div>
              {service.procedureDescription
                .split(/\d+\.\s*/)
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <div key={index} style={{ marginBottom: 18 }}>
                    <Tag color="blue" style={{ fontSize: 14 }}>
                      Bước {index + 1}
                    </Tag>
                    <Text style={{ marginLeft: 8 }}>{step.trim()}</Text>
                  </div>
                ))}
            </div>

            <Button
              type="primary"
              size="large"
              style={{ marginTop: 20, background: "rgb(175, 141, 112)" }}
              onClick={handleNavigate}
            >
              Đặt lịch ngay
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ServiceDetail;
