// import { Card, Col, Row, Typography, Button, Tag } from "antd";
// import "../style/Price.css";

// const { Title, Paragraph } = Typography;

// type PricingPlan = {
//   title: string;
//   price: string;
//   description: string;
//   features: string[];
//   tag?: string;
//   isPopular?: boolean;
// };

// const pricingPlans: PricingPlan[] = [
//   {
//     title: "Basic Care",
//     price: "500,000 VND",
//     description: "Dịch vụ chăm sóc da cơ bản phù hợp với mọi loại da.",
//     features: ["Làm sạch sâu", "Dưỡng ẩm da", "Massage thư giãn 20 phút"],
//     tag: "HSSV",
//   },
//   {
//     title: "Premium Care",
//     price: "1,000,000 VND",
//     description: "Dịch vụ cao cấp dành riêng cho da khô và nhạy cảm.",
//     features: [
//       "Làm sạch sâu",
//       "Dưỡng chất collagen",
//       "Thải độc da chuyên sâu",
//       "Massage thư giãn 30 phút",
//     ],
//     isPopular: true,
//   },
//   {
//     title: "Luxury Care",
//     price: "2,500,000 VND",
//     description: "Dịch vụ VIP dành cho khách hàng muốn trải nghiệm tốt nhất.",
//     features: [
//       "Làm sạch và trẻ hóa làn da",
//       "Dưỡng chất vàng 24k",
//       "Thải độc da nâng cao",
//       "Massage thư giãn 60 phút",
//       "Tư vấn chuyên sâu 1:1",
//     ],
//   },
// ];

// const PricingTable = () => {
//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "#F1EBE4",
//         borderRadius: "12px",
//         textAlign: "center",
//       }}
//     >
//       <Title
//         level={2}
//         style={{
//           // color: "#3A5A40",
//           color: "#6f4e37",
//           fontSize: "32px",
//           fontWeight: "bold",
//           marginBottom: "20px",
//         }}
//       >
//         Bảng Giá Dịch Vụ Chăm Sóc Da
//       </Title>

//       <Paragraph
//         style={{
//           fontSize: "18px",
//           // color: "#6B705C",
//           color: "#c19a6b",
//           marginBottom: "40px",
//         }}
//       >
//         Chọn gói dịch vụ phù hợp với nhu cầu của bạn và tận hưởng làn da khỏe
//         mạnh!
//       </Paragraph>

//       <Row gutter={[32, 32]} justify="center">
//         {pricingPlans.map((plan, index) => (
//           <Col xs={24} sm={12} lg={8} key={index}>
//             <Card
//               hoverable
//               style={{
//                 borderRadius: "12px",
//                 textAlign: "center",
//                 padding: "20px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                 transition: "transform 0.3s ease-in-out",
//                 backgroundColor: plan.isPopular ? "#FFF9E6" : "white",
//                 border: plan.isPopular ? "2px solid #FFD700" : "1px solid #ddd",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.05)")
//               }
//               onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               <Title
//                 level={4}
//                 // style={{ color: "#3A5A40", marginBottom: "10px" }}
//                 style={{ color: "#6f4e37", marginBottom: "10px" }}
//               >
//                 {plan.title}
//               </Title>

//               {plan.tag && (
//                 <Tag
//                   color="blue"
//                   style={{ fontSize: "14px", marginBottom: "5px" }}
//                 >
//                   {plan.tag}
//                 </Tag>
//               )}
//               {plan.isPopular && (
//                 <Tag
//                   color="gold"
//                   style={{ fontSize: "14px", fontWeight: "bold" }}
//                 >
//                   Phổ Biến
//                 </Tag>
//               )}

//               <Title
//                 level={3}
//                 style={{
//                   // color: "#A7C957",
//                   color: "#c19a6b",
//                   fontWeight: "bold",
//                   margin: "20px 0",
//                 }}
//               >
//                 {plan.price}
//               </Title>

//               {/* <Paragraph style={{ fontSize: "16px", color: "#6B705C" }}> */}
//               <Paragraph style={{ fontSize: "16px", color: "#c19a6b" }}>
//                 {plan.description}
//               </Paragraph>

//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {plan.features.map((feature, idx) => (
//                   <li
//                     key={idx}
//                     style={{
//                       fontSize: "16px",
//                       // color: "#444",
//                       color: "#8b4513",
//                       marginBottom: "8px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     ✅ {feature}
//                   </li>
//                 ))}
//               </ul>

//               <Button
//                 type="primary"
//                 block
//                 style={{
//                   marginTop: "20px",
//                   // backgroundColor: "#A7C957",
//                   backgroundColor: "#c19a6b",
//                   border: "none",
//                   fontSize: "16px",
//                   padding: "12px 24px",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                   transition: "all 0.3s ease-in-out",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#8AA851")
//                 }
//                 onMouseOut={(e) =>
//                   // (e.currentTarget.style.backgroundColor = "#A7C957")
//                   (e.currentTarget.style.backgroundColor = "#c19a6b")
//                 }
//               >
//                 Đặt Dịch Vụ
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default PricingTable;
import { Table } from "antd";
import { useServices } from "../features/services/hooks/useGetService";
import "../style/Price.css";
import Title from "antd/es/typography/Title";

const PricingTable = () => {
  const { data, isLoading, error } = useServices();

  const columns = [
    { title: "Dịch vụ", dataIndex: "name", key: "name" },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN"),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Title
        level={2}
        style={{
          color: "#6f4e37",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Bảng Giá Dịch Vụ Chăm Sóc Da
      </Title>
      <div className="service-table-container">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="serviceId"
          pagination={false}
        />
      </div>
    </>
  );
};

export default PricingTable;
