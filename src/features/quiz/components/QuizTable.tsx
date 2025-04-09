/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  Space,
  Input as AntInput,
  Form,
  message,
  Button,
  Modal,
  Tooltip,
  Flex,
  Select,
} from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useQuizQuestion } from "../hooks/useGetQuizQuestion";
import { useDeleteQuizQuestion } from "../hooks/useDeleteQuizQuestion";
import { useUpdateQuizQuestion } from "../hooks/useUpdateQuizQuestion";
import { useCreateQuizQuestion } from "../hooks/useCreateQuizQuesion";
import { useQuizAnswer } from "../hooks/useGetQuizAnswer";
import { useCreateQuizAnswer } from "../hooks/useCreateQuizAnswer";
import { useDeleteQuizAnswer } from "../hooks/useDeleteQuizAnswer";
import { useUpdateQuizAnswer } from "../hooks/useUpdateQuizAnswer";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import { SkinDto } from "../../skin_type/dto/skin.dto";
import { useSkinTypes } from "../../skin_type/hooks/useGetSkin";

const { Option } = Select;

const QuizTable = () => {
  const {
    data: quizQuestions,
    isLoading: isLoadingQuizQuestion,
    refetch: refetchQuizQuestions,
  } = useQuizQuestion();
  const {
    data: quizAnswers,
    isLoading: isLoadingQuizAnswer,
    refetch: refetchQuizAnswers,
  } = useQuizAnswer();
  const { data: skinTypes, isLoading: isLoadingSkinTypes } = useSkinTypes();
  const { mutate: createQuizAnswer } = useCreateQuizAnswer();
  const { mutate: createQuizQuestion } = useCreateQuizQuestion();
  const { mutate: deleteQuizAnswer } = useDeleteQuizAnswer();
  const { mutate: deleteQuizQuestion } = useDeleteQuizQuestion();
  const { mutate: updateQuizAnswer } = useUpdateQuizAnswer();
  const { mutate: updateQuizQuestion } = useUpdateQuizQuestion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteQuizAnswerModalOpen, setDeleteQuizAnswerModalOpen] =
    useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [editingSkinTypeId, setEditingSkinTypeId] = useState<number | null>(
    null
  );
  const [editingServiceImpact, setEditingServiceImpact] = useState<string>("");
  const [questionToDelete, setQuestionToDelete] = useState<any>(null);
  const [answerToDelete, setAnswerToDelete] = useState<any>(null);
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
  const [editingAnswerValue, setEditingAnswerValue] = useState<string>("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [questionForm] = Form.useForm();
  const [answerForm] = Form.useForm();

  const handleCreate = () => {
    setEditingQuestion(null);
    setIsModalCreateOpen(true);
    questionForm.resetFields();
  };

  const handleCreateQuestion = () => {
    questionForm
      .validateFields()
      .then((values) => {
        createQuizQuestion(values, {
          onSuccess: () => {
            message.success("Tạo câu hỏi thành công");
            setIsModalCreateOpen(false);
            questionForm.resetFields();
            refetchQuizQuestions();
          },
          onError: (err: { message: unknown }) => {
            message.error(`Lỗi tạo câu hỏi: ${err.message}`);
          },
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleEditQuestion = (record: any) => {
    setEditingQuestion(record);
    questionForm.setFieldsValue(record);
    setIsModalCreateOpen(true);
  };

  const handleDeleteQuestion = (quizquestionId: number) => {
    setQuestionToDelete(quizquestionId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteQuestion = () => {
    if (questionToDelete) {
      deleteQuizQuestion(questionToDelete, {
        onSuccess: () => {
          message.success("Xóa câu hỏi thành công");
          setDeleteModalOpen(false);
          setQuestionToDelete(null);
        },
        onError: (err: { message: any }) => {
          message.error(`Lỗi xóa câu hỏi: ${err.message}`);
        },
      });
    }
  };

  const handleUpdateQuestion = () => {
    questionForm
      .validateFields()
      .then((values) => {
        updateQuizQuestion(
          { quizquestionId: editingQuestion.quizquestionId, data: values },
          {
            onSuccess: () => {
              message.success("Cập nhật câu hỏi thành công");
              setIsModalCreateOpen(false);
              setEditingQuestion(null);
            },
            onError: (err: { message: any }) => {
              message.error(`Lỗi cập nhật câu hỏi: ${err.message}`);
            },
          }
        );
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleAddAnswers = (quizquestionId: number) => {
    const relatedAnswers = (quizAnswers || []).filter(
      (answer) => answer.quizquestionId === quizquestionId
    );
    if (relatedAnswers.length >= 4) {
      message.error("Mỗi câu hỏi chỉ được phép có tối đa 4 câu trả lời!");
      return;
    }

    setSelectedQuizId(quizquestionId);
    setIsModalOpen(true);
    answerForm.resetFields();
  };

  const handleDeleteAnswer = (answerId: number) => {
    setAnswerToDelete(answerId);
    setDeleteQuizAnswerModalOpen(true);
  };

  const confirmDeleteAnswer = () => {
    if (answerToDelete) {
      deleteQuizAnswer(answerToDelete, {
        onSuccess: () => {
          message.success("Xóa câu trả lời thành công");
          setDeleteQuizAnswerModalOpen(false);
          setAnswerToDelete(null);
        },
        onError: (err: { message: any }) => {
          message.error(`Lỗi xóa câu hỏi: ${err.message}`);
        },
      });
    }
  };

  const handleEditAnswer = (record: QuizAnswerDto) => {
    setEditingAnswerId(record.answerId);
    setEditingAnswerValue(record.answer);
    setEditingSkinTypeId(record.skintypeId);
    setEditingServiceImpact(record.serviceImpact);
  };

  const handleSaveAnswer = (record: QuizAnswerDto) => {
    if (editingAnswerValue.trim() === "") {
      message.error("Câu trả lời không được để trống");
      return;
    }

    const updatedAnswer = {
      ...record,
      answer: editingAnswerValue,
      skintypeId: editingSkinTypeId,
      serviceImpact: editingServiceImpact,
    };

    updateQuizAnswer(
      {
        answerId: record.answerId,
        data: { ...updatedAnswer, skintypeId: editingSkinTypeId ?? 0 },
      },
      {
        onSuccess: () => {
          message.success("Cập nhật câu trả lời thành công");
          setEditingAnswerId(null);
          setEditingAnswerValue("");
          refetchQuizAnswers();
        },
        onError: (err: { message: any }) => {
          message.error(`Lỗi cập nhật câu trả lời: ${err.message}`);
        },
      }
    );
  };

  const handleCancelEditAnswer = () => {
    setEditingAnswerId(null);
    setEditingAnswerValue("");
    setEditingSkinTypeId(null);
    setEditingServiceImpact("");
  };

  const handleSubmitAnswers = () => {
    answerForm
      .validateFields()
      .then((values) => {
        if (selectedQuizId === null) {
          message.error("Không tìm thấy quizquestionId!");
          return;
        }

        const answers = values.answers;

        if (!answers || answers.length === 0) {
          message.error("Vui lòng thêm ít nhất một câu trả lời.");
          return;
        }

        const relatedAnswers = (quizAnswers || []).filter(
          (answer) => answer.quizquestionId === selectedQuizId
        );
        const totalAnswersAfterAdding = relatedAnswers.length + answers.length;

        if (totalAnswersAfterAdding > 4) {
          message.error(
            `Mỗi câu hỏi chỉ được phép có tối đa 4 câu trả lời! Hiện tại đã có ${relatedAnswers.length} câu trả lời.`
          );
          return;
        }

        answers.forEach((answer: QuizAnswerDto, index: number) => {
          const answerData: QuizAnswerDto = {
            answerId: 0,
            customerId: 0,
            answer: answer.answer,
            quizquestionId: selectedQuizId,
            skintypeId: Number(answer.skintypeId),
            serviceImpact: answer.serviceImpact,
          };

          createQuizAnswer(answerData, {
            onSuccess: () => {
              message.success(`Tạo ${index + 1} câu trả lời thành công`);
              if (index === answers.length - 1) {
                setIsModalOpen(false);
                answerForm.resetFields();
                refetchQuizAnswers();
              }
            },
            onError: (err: { message: any }) => {
              message.error(`Lỗi tạo câu trả lời ${index + 1}: ${err.message}`);
            },
          });
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const quizColumns: ColumnsType<QuizQuestionDto> = [
    {
      title: "No",
      dataIndex: "No",
      width: 50,
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Question",
      dataIndex: "content",
      key: "content",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Thêm câu trả lời">
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleAddAnswers(record.quizquestionId)}
            />
          </Tooltip>
          <Tooltip title="Chi tiết">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditQuestion(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteQuestion(record.quizquestionId)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleExpand = (expanded: boolean, record: QuizQuestionDto) => {
    if (expanded) {
      setExpandedRowKeys([record.quizquestionId]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  const answerColumns: ColumnsType<QuizAnswerDto> = [
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text, record) => {
        return editingAnswerId === record.answerId ? (
          <AntInput
            value={editingAnswerValue}
            onChange={(e) => setEditingAnswerValue(e.target.value)}
            onPressEnter={() => handleSaveAnswer(record)}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Skin Type",
      key: "skintypeName",
      render: (_, record) => {
        if (editingAnswerId === record.answerId) {
          const relatedAnswers = (quizAnswers || []).filter(
            (answer) =>
              answer.quizquestionId === record.quizquestionId &&
              answer.answerId !== record.answerId
          );
          const usedSkinTypeIds = relatedAnswers.map(
            (answer) => answer.skintypeId
          );

          return (
            <Select
              value={editingSkinTypeId}
              onChange={(value) => setEditingSkinTypeId(value)}
              placeholder="Chọn loại da"
              allowClear
              style={{ width: "100%" }}
              loading={isLoadingSkinTypes}
              disabled={isLoadingSkinTypes || !skinTypes?.length}
            >
              {skinTypes?.length ? (
                skinTypes
                  .filter(
                    (skin: SkinDto) =>
                      !usedSkinTypeIds.includes(skin.skintypeId)
                  )
                  .map((skin: SkinDto) => (
                    <Option key={skin.skintypeId} value={skin.skintypeId}>
                      {skin.skintypeName ?? `Loại da ${skin.skintypeId}`}
                    </Option>
                  ))
              ) : (
                <Option value="" disabled>
                  Không có loại da nào
                </Option>
              )}
            </Select>
          );
        }

        const skinType = skinTypes?.find(
          (skin: SkinDto) => skin.skintypeId === record.skintypeId
        );
        return skinType ? (
          skinType.skintypeName ?? `Loại da ${skinType.skintypeId}`
        ) : (
          <span style={{ color: "red" }}>Không tìm thấy loại da</span>
        );
      },
    },
    {
      title: "Service Impact",
      dataIndex: "serviceImpact",
      key: "serviceImpact",
      render: (text, record) => {
        if (editingAnswerId === record.answerId) {
          return (
            <Select
              value={editingServiceImpact}
              onChange={(value) => setEditingServiceImpact(value)}
              placeholder="Chọn Service Impact"
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {editingAnswerId === record.answerId ? (
            <>
              <Tooltip title="Lưu">
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={() => handleSaveAnswer(record)}
                />
              </Tooltip>
              <Tooltip title="Hủy">
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancelEditAnswer}
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Chỉnh sửa">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditAnswer(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteAnswer(record.answerId)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getUsedSkinTypeIds = (quizquestionId: number | null) => {
    if (!quizquestionId) return [];
    const relatedAnswers = (quizAnswers || []).filter(
      (answer) => answer.quizquestionId === quizquestionId
    );
    return relatedAnswers.map((answer) => answer.skintypeId);
  };

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách quiz</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tạo quiz
        </Button>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Table
        loading={isLoadingQuizQuestion || isLoadingQuizAnswer}
        dataSource={quizQuestions || []}
        columns={quizColumns}
        rowKey="quizquestionId"
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpand: handleExpand,
          expandedRowRender: (quiz) => {
            const relatedAnswers = (quizAnswers || []).filter(
              (answer) => answer.quizquestionId === quiz.quizquestionId
            );

            if (isLoadingQuizAnswer || !quizAnswers)
              return <p>Loading answers...</p>;

            if (relatedAnswers.length === 0) {
              return <p>Không tìm thấy câu trả lời</p>;
            }

            return (
              <Table
                dataSource={Array.isArray(relatedAnswers) ? relatedAnswers : []}
                columns={answerColumns}
                rowKey="answerId"
                pagination={false}
              />
            );
          },
        }}
      />

      <Modal
        title="Tạo câu trả lời"
        open={isModalOpen}
        onOk={handleSubmitAnswers}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={answerForm} layout="vertical">
          <Form.List name="answers">
            {(fields, { add, remove }) => {
              const relatedAnswers = (quizAnswers || []).filter(
                (answer) => answer.quizquestionId === selectedQuizId
              );
              const canAddMore = relatedAnswers.length + fields.length < 4;

              const usedSkinTypeIds = getUsedSkinTypeIds(selectedQuizId);

              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: 16,
                        border: "1px solid #ddd",
                        padding: 10,
                        borderRadius: 5,
                        width: "-webkit-fill-available",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "answer"]}
                        label="Nội dung câu trả lời"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập câu trả lời",
                          },
                        ]}
                      >
                        <AntInput placeholder="Nhập câu trả lời" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "skintypeId"]}
                        label="Loại da"
                        rules={[
                          { required: true, message: "Vui lòng chọn loại da" },
                        ]}
                      >
                        <Select
                          placeholder="Chọn loại da"
                          allowClear
                          style={{ width: "100%" }}
                          loading={isLoadingSkinTypes}
                          disabled={isLoadingSkinTypes || !skinTypes?.length}
                        >
                          {skinTypes?.length ? (
                            skinTypes
                              .filter(
                                (skin: SkinDto) =>
                                  !usedSkinTypeIds.includes(skin.skintypeId)
                              )
                              .map((skin: SkinDto) => (
                                <Option
                                  key={skin.skintypeId}
                                  value={skin.skintypeId}
                                >
                                  {skin.skintypeName ??
                                    `Loại da ${skin.skintypeId}`}
                                </Option>
                              ))
                          ) : (
                            <Option value="" disabled>
                              Không có loại da nào
                            </Option>
                          )}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "serviceImpact"]}
                        label="Service Impact"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn Service Impact",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn Service Impact"
                          allowClear
                          style={{ width: "100%" }}
                          options={[
                            { value: "High", label: "High" },
                            { value: "Medium", label: "Medium" },
                            { value: "Low", label: "Low" },
                          ]}
                        />
                      </Form.Item>

                      <Button onClick={() => remove(name)} danger>
                        Hủy
                      </Button>
                    </div>
                  ))}
                  {canAddMore ? (
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm câu trả lời
                    </Button>
                  ) : (
                    <p style={{ color: "red", textAlign: "center" }}>
                      Đã đạt giới hạn 4 câu trả lời cho câu hỏi này!
                    </p>
                  )}
                </>
              );
            }}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        title={editingQuestion ? "Cập nhật câu hỏi" : "Tạo câu hỏi"}
        open={isModalCreateOpen}
        onOk={editingQuestion ? handleUpdateQuestion : handleCreateQuestion}
        onCancel={() => setIsModalCreateOpen(false)}
        okText={editingQuestion ? "Cập nhật" : "Tạo"}
        centered
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form
          form={questionForm}
          layout="vertical"
          initialValues={{ questionsId: 1 }}
        >
          <Form.Item
            name="content"
            label="Nội dung câu hỏi"
            rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
          >
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteQuizAnswerModalOpen}
        style={{ width: "max-content" }}
        onCancel={() => setDeleteQuizAnswerModalOpen(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setDeleteQuizAnswerModalOpen(false)}
          >
            Hủy
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={confirmDeleteAnswer}
          >
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa câu trả lời này không?</p>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        style={{ width: "max-content" }}
        onCancel={() => setDeleteModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setDeleteModalOpen(false)}>
            Hủy
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={confirmDeleteQuestion}
          >
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa câu hỏi này không?</p>
      </Modal>
    </div>
  );
};

export default QuizTable;
