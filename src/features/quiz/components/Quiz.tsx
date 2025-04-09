import { useState, useEffect } from "react";
import { Card, Button, Radio, message, Typography, Spin, Col, Row } from "antd";
import { useQuizQuestion } from "../hooks/useGetQuizQuestion";
import { useQuizAnswer } from "../hooks/useGetQuizAnswer";
import { useSubmitQuiz } from "../hooks/useSubmitQuiz";
import { useSkinTypes } from "../../skin_type/hooks/useGetSkin";
import { useServices } from "../../services/hooks/useGetService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../style/Quiz.css";
import { PagePath } from "../../../enums/page-path.enum";
import { SkintypeServiceDto } from "../../services/dto/skintype-service.dto";

const { Title, Text, Paragraph } = Typography;

const QuizTest = () => {
  const { data: questionData = [], isLoading: isLoadingQuestion } =
    useQuizQuestion();
  const { data: skinTypeData = [] } = useSkinTypes();
  const { data: answerData = [], isLoading: isLoadingAnswer } = useQuizAnswer();
  const { data: allServices = [] } = useServices();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [recommendedSkinType, setRecommendedSkinType] = useState<string | null>(
    null
  );
  const [serviceList, setServiceList] = useState<
    {
      serviceId: number;
      name: string;
      price: number;
      duration: number;
      image: string;
      skintypes: string[];
    }[]
  >([]);

  const submitQuiz = useSubmitQuiz();
  const navigate = useNavigate();
  const customerId = Number(localStorage.getItem("customerId") || "1");

  // **Lấy tất cả loại da phù hợp với dịch vụ**
  const fetchSkinTypeByServiceId = async (
    serviceId: number
  ): Promise<string[]> => {
    try {
      const response = await axios.get<SkintypeServiceDto[]>(
        `https://localhost:7071/getSkintypeServiceByServiceId/${serviceId}`
      );
      return response.data.map((item) => {
        const skin = skinTypeData.find((s) => s.skintypeId === item.skintypeId);
        return skin ? skin.skintypeName : "Không xác định";
      });
    } catch (error) {
      console.error(`Lỗi khi tải loại da cho serviceId ${serviceId}:`, error);
      return ["Không xác định"];
    }
  };

  // **Fetch danh sách dịch vụ sau khi có kết quả loại da**
  useEffect(() => {
    if (recommendedSkinType && allServices.length > 0) {
      const fetchServices = async () => {
        const updatedServices = await Promise.all(
          allServices.map(async (service) => {
            const skinTypes = await fetchSkinTypeByServiceId(service.serviceId);
            return { ...service, skintypes: skinTypes };
          })
        );

        // **Lọc chỉ các dịch vụ có chứa loại da được đề xuất**
        const filteredServices = updatedServices.filter((service) =>
          service.skintypes.includes(recommendedSkinType)
        );

        setServiceList(filteredServices);
      };

      fetchServices();
    }
  }, [allServices, skinTypeData, recommendedSkinType]);

  if (isLoadingQuestion || isLoadingAnswer)
    return <Spin tip="Đang tải câu hỏi..." />;
  if (!questionData.length) return <p>Không có dữ liệu câu hỏi!</p>;

  const currentQuestion = questionData[currentQuestionIndex];

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.quizquestionId]) {
      message.warning("Vui lòng chọn một đáp án!");
      return;
    }
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const submitData = {
      customerId,
      answers: questionData.map((q) => ({
        questionId: q.quizquestionId,
        answerId: selectedAnswers[q.quizquestionId],
      })),
    };

    submitQuiz.mutate(submitData, {
      onSuccess: (data) => {
        message.success("Bài quiz đã được gửi thành công!");
        setRecommendedSkinType(data.recommendedSkinType || "Không xác định");
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi nộp bài! Vui lòng thử lại.");
      },
    });
  };

  const matchedSkinType = skinTypeData.find(
    (skin) =>
      skin.skintypeName.toLowerCase() === recommendedSkinType?.toLowerCase()
  );

  return (
    <div className="quiz-container">
      {!recommendedSkinType && (
        <Card className="quiz-card">
          <Title level={4}>
            Câu hỏi {currentQuestionIndex + 1}/{questionData.length}
          </Title>
          <Text className="quiz-text">{currentQuestion?.content}</Text>
          <Radio.Group
            onChange={(e) =>
              handleAnswerChange(currentQuestion.quizquestionId, e.target.value)
            }
            value={selectedAnswers[currentQuestion.quizquestionId] || null}
            className="quiz-radio-group"
          >
            {answerData
              .filter(
                (ans) => ans.quizquestionId === currentQuestion.quizquestionId
              )
              .map((option) => (
                <Radio key={option.answerId} value={option.answerId}>
                  {option.answer}
                </Radio>
              ))}
          </Radio.Group>
          <Button
            type="primary"
            className="quiz-button"
            style={{ marginTop: 20 }}
            onClick={handleNext}
          >
            {currentQuestionIndex < questionData.length - 1
              ? "Tiếp theo"
              : "Hoàn thành"}
          </Button>
        </Card>
      )}

      {matchedSkinType && (
        <Card className="result-card" style={{ marginTop: 20 }}>
          <Title level={4}>Loại da của bạn:</Title>
          <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
            {matchedSkinType.skintypeName}
          </Text>
          <Title level={5}>Ưu điểm:</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: matchedSkinType.pros }} />
          </Paragraph>
          <Title level={5}>Nhược điểm:</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: matchedSkinType.cons }} />
          </Paragraph>
          <Title level={5}>Hướng dẫn chăm sóc:</Title>
          <Paragraph>
            <div
              dangerouslySetInnerHTML={{
                __html: matchedSkinType.skincareGuide,
              }}
            />
          </Paragraph>
        </Card>
      )}

      {serviceList.length > 0 && (
        <div className="service-list" style={{ marginTop: 20 }}>
          <Title level={4}>Dịch vụ phù hợp:</Title>
          <Row gutter={[16, 16]}>
            {serviceList.map((service) => (
              <Col key={service.serviceId} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={service.name} src={service.image} />}
                >
                  <Title level={5}>{service.name}</Title>
                  <Text strong>Giá: {service.price} VNĐ</Text>
                  <br />
                  <Text>Thời gian: {service.duration} phút</Text>
                  <br />
                  <Text>Loại da phù hợp: {service.skintypes.join(", ")}</Text>
                  <br />
                  <Button
                    type="primary"
                    style={{ marginTop: 10 }}
                    onClick={() =>
                      navigate(PagePath.SKIN_SERVICE_DETAIL, {
                        state: { serviceId: service.serviceId },
                      })
                    }
                  >
                    Chi tiết
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default QuizTest;
