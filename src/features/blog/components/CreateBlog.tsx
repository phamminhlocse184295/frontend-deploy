import { useState } from "react";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Input, message, Upload, Spin, Flex } from "antd";
import { useCreateBlog } from "../hooks/useCreateBlog";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetCustomerById } from "../../user/hook/useGetCustomerById";
import { UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const CreateBlog = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { mutate } = useCreateBlog();
  const navigate = useNavigate();
  const { data: customer } = useGetCustomerById(); // Lấy customer từ API
  const customerId = customer?.customerId;

  const handleFireBaseUpload = (file: File) => {
    if (!file) {
      message.error("Vui lòng chọn một hình ảnh!");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setUploading(false);
        message.error(`Lỗi khi upload hình ảnh: ${error.message}`);
        console.error("Upload error:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL); // Cập nhật imageUrl sau khi upload thành công
          setUploading(false);
          message.success("Upload hình ảnh thành công!");
        } catch (error) {
          setUploading(false);
          message.error("Lỗi khi lấy URL hình ảnh!");
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const handleCreateBlog = () => {
    if (!title || !content || !imageUrl || !customerId) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    mutate(
      {
        blogId: 0,
        title,
        content,
        customerId: 1,
        image: imageUrl,
        createAt: dayjs().toDate(),
      },
      {
        onSuccess: () => {
          message.success("Blog đã được tạo thành công!");
          navigate("/Homepage/Blog");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi tạo blog!");
        },
      }
    );
  };

  return (
    <Flex vertical style={{ padding: "20px" }}>
      <Title level={2}>Tạo Blog Mới</Title>
      <Input
        placeholder="Nhập tiêu đề blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Nhập nội dung blog"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={{ marginBottom: "10px" }}
      />
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          handleFireBaseUpload(file);
          return false;
        }}
        accept="image/*"
      >
        <Button
          icon={<UploadOutlined />}
          loading={uploading}
          style={{ marginBottom: "10px" }}
        >
          Tải ảnh lên
        </Button>
      </Upload>
      {uploading && <Spin style={{ marginBottom: "10px" }} />}
      {imageUrl && (
        <div style={{ marginBottom: "10px" }}>
          <p>Ảnh đã tải lên:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: 200 }} />
        </div>
      )}
      <Button
        type="primary"
        onClick={handleCreateBlog}
        size="large"
        disabled={uploading || !title || !content || !imageUrl}
      >
        Tạo Blog
      </Button>
    </Flex>
  );
};

export default CreateBlog;
