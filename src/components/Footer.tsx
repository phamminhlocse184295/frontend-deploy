import { Layout, Row, Col, Typography, Space } from "antd";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const Footers = () => {
  return (
    <Footer style={{ background: "#222", color: "#fff", padding: "40px 60px" }}>
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={3} style={{ color: "#fff" }}>
            CEIN.
          </Title>
          <Text style={{ color: "#fff" }}>FOLLOW US</Text>
          <Space size="middle" style={{ display: "block", marginTop: 8 }}>
            <Row>
              <TwitterOutlined style={{ fontSize: 20, color: "#fff" }} />
              <InstagramOutlined
                style={{ fontSize: 20, color: "#fff", margin: "0 10px" }}
              />
              <FacebookOutlined style={{ fontSize: 20, color: "#fff" }} />
            </Row>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Title level={5} style={{ color: "#fff" }}>
            Products
          </Title>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Inner Care
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Skin Care
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Scalp Care
          </Link>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Title level={5} style={{ color: "#fff" }}>
            Guides
          </Title>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            News
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Vision
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Q&A
          </Link>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Title level={5} style={{ color: "#fff" }}>
            Service
          </Title>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            About Concierge
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Online Consultation
          </Link>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Market
          </Link>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Title level={5} style={{ color: "#fff" }}>
            Contact
          </Title>
          <Link href="#" style={{ display: "block", color: "#ccc" }}>
            Contact Us
          </Link>
        </Col>
      </Row>

      <Row style={{ marginTop: 40, textAlign: "center" }}>
        <Col span={24}>
          <Text style={{ color: "#ccc" }}>
            CEIN. 2019 KINS All rights reserved.
          </Text>
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <Space size="middle">
            <Link href="#" style={{ color: "#ccc" }}>
              Company Profile
            </Link>
            <Link href="#" style={{ color: "#ccc" }}>
              Privacy policy
            </Link>
            <Link href="#" style={{ color: "#ccc" }}>
              Cancellation policy
            </Link>
            <Link href="#" style={{ color: "#ccc" }}>
              Terms of service
            </Link>
            <Link href="#" style={{ color: "#ccc" }}>
              Refund/Return Policy
            </Link>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default Footers;
