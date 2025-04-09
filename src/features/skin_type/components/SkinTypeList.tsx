import { Card, Typography, Image, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const { Title } = Typography;
import { PagePath } from "../../../enums/page-path.enum";
import "../../../style/SkinType.css";
import { useSkinTypes } from "../hooks/useGetSkin";
import { useSkinStore } from "../hooks/useSkinStore";

const SkinType = () => {
  const {
    data: skinTypeData,
    isLoading: isLoadingSkinType,
    error: errorSkinType,
  } = useSkinTypes();

  const { setSkins } = useSkinStore();

  useEffect(() => {
    document.body.classList.add("typeofskin");

    return () => {
      document.body.classList.remove("typeofskin");
    };
  }, []);

  useEffect(() => {
    if (skinTypeData && !isLoadingSkinType && !errorSkinType) {
      setSkins(skinTypeData);
    }
  }, [skinTypeData, isLoadingSkinType, errorSkinType, setSkins]);

  return (
    <div className="typeofskin">
      <Title level={3} className="title-main">
        Các loại da mà chúng ta thường gặp hiện nay
      </Title>

      <Card className="card-container">
        <Title level={2} className="section-title">
          Da có thể được phân loại thành nhiều loại khác nhau dựa trên đặc điểm
          sinh lý và nhu cầu chăm sóc. Có 4 loại da chính:
        </Title>
        {skinTypeData?.map((skinType, index) => (
          <div key={skinType.skintypeName}>
            <Title level={3} className="skin-title">
              {index + 1}. {skinType.skintypeName}
            </Title>
            <Title level={4}>{skinType.introduction}</Title>

            <Title level={4} className="sub-title">
              {index + 1}.1 Đặc điểm
            </Title>
            <Image
              src={skinType.image}
              alt={skinType.skintypeName}
              className="skin-image"
            />
            <div dangerouslySetInnerHTML={{ __html: skinType.description }} />

            <Title level={4} className="sub-title">
              {index + 1}.2 Ưu điểm
            </Title>
            <div dangerouslySetInnerHTML={{ __html: skinType.pros }} />

            <Title level={4} className="sub-title">
              {index + 1}.3 Nhược điểm
            </Title>
            <div dangerouslySetInnerHTML={{ __html: skinType.cons }} />

            <Title level={4} className="sub-title">
              {index + 1}.4 Cách chăm sóc
            </Title>
            <div dangerouslySetInnerHTML={{ __html: skinType.skincareGuide }} />
          </div>
        ))}

        <Title level={5} className="quiz-intro">
          Bạn đã hiểu rõ về loại da của mình chưa? Hãy tham gia bài quiz để kiểm
          tra kiến thức và tìm ra loại da phù hợp với bạn nhé!
        </Title>

        <Link to={PagePath.QUIZ}>
          <Button type="primary" size="large" className="quiz-button">
            Tới trang làm quiz
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default SkinType;
