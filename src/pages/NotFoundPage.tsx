import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: saddlebrown;
  text-align: center;
`;

const Content = styled.div`
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const StyledImage = styled.img`
  max-width: 80%;
  margin-bottom: 20px;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <StyledImage
          src="https://cdn.pixabay.com/photo/2016/11/22/19/05/woman-1853939_1280.jpg"
          alt="Relaxing Spa"
        />
        <Title level={2} style={{ color: "saddlebrown" }}>
          Oops! Trang không tồn tại
        </Title>
        <Text style={{ display: "block", marginBottom: "20px", color: "#666" }}>
          Có vẻ như bạn đã lạc vào một khu vực chưa được chăm sóc! Hãy quay lại
          và tiếp tục hành trình làm đẹp của bạn.
        </Text>
        <Button
          type="primary"
          icon={<HomeOutlined />}
          size="large"
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </Button>
      </Content>
    </Container>
  );
};

export default NotFoundPage;
