import { Card, Typography, Image, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;
import { PagePath } from "../enums/page-path.enum";
import "../style/SkinType.css";

const SkinType = () => {
  useEffect(() => {
    // Thêm class vào body khi component mount
    document.body.classList.add("typeofskin");

    // Xóa class khi rời khỏi component
    return () => {
      document.body.classList.remove("typeofskin");
    };
  }, []);
  return (
    <div className="typeofskin">
      {/* Tiêu đề */}
      <Title level={3} className="title-main">
        Các loại da mà chúng ta thường gặp hiện nay
      </Title>

      {/* Thẻ Card chứa nội dung về da thường */}
      <Card className="card-container">
        {/* Da thường */}
        <Title level={2} className="section-title">
          Da có thể được phân loại thành nhiều loại khác nhau dựa trên đặc điểm
          sinh lý và nhu cầu chăm sóc. Có 4 loại da chính:
        </Title>
        <Title level={3} className="skin-title">
          1. Da thường(Normal Skin)
        </Title>
        {/* <Paragraph>
          “Da thường" là một làn da cân bằng. Các vùng chữ T (trán, cằm và mũi)
          có thể là một chút dầu, nhưng nhìn chung độ dầu và độ ẩm cân bằng và
          da không quá nhờn hoặc quá khô.
        </Paragraph> */}
        <Title level={4}>
          “Da thường" là một làn da cân bằng. Các vùng chữ T (trán, cằm và mũi)
          có thể là một chút dầu, nhưng nhìn chung độ dầu và độ ẩm cân bằng và
          da không quá nhờn hoặc quá khô.
        </Title>
        <Title level={4} className="sub-title">
          1.1 Đặc điểm
        </Title>
        <Image
          src="https://www.kiehls.com.vn/on/demandware.static/-/Sites-kiehls-vn-ng-Library/vi_VN/dw1698b3ae/images/optimize/Tos_Team/da-thuong/da-thuong-new-01.jpg"
          alt="Da thường"
          className="skin-image"
        />
        {/* <Paragraph> */}
        <Title level={4}>
          <ul>
            <li>Là loại da cân bằng tốt giữa dầu và nước</li>
            <li>Lỗ chân lông nhỏ, không dễ bị bít tắc</li>
            <li>Bề mặt da mịn màng, đều màu, không có nhiều khuyết điểm</li>
            <li>
              Không quá nhạy cảm với các tác động từ môi trường hoặc mỹ phẩm
            </li>
          </ul>
          {/* </Paragraph> */}
        </Title>

        <Title level={4} className="sub-title">
          1.2 Ưu điểm
        </Title>
        <Paragraph>
          <ul>
            <li> Ít gặp vấn đề về mụn, dầu thừa hay khô da</li>
            <li> Không cần chăm sóc quá cầu kỳ</li>
            <li>Làn da trông khỏe mạnh, ít bị kích ứng</li>
          </ul>
        </Paragraph>
        <Title level={4} className="sub-title">
          1.3 Nhược điểm
        </Title>
        <Paragraph>
          <ul>
            <li>
              Nếu không duy trì chế độ chăm sóc phù hợp, da có thể trở thành da
              khô hoặc hỗn hợp theo thời gian.
            </li>
          </ul>
        </Paragraph>
        <Title level={4} className="sub-title">
          1.4 Cách chăm sóc
        </Title>
        <Paragraph>
          <ul>
            <li>Duy trì độ ẩm bằng kem dưỡng nhẹ, không quá dày</li>
            <li>
              Rửa mặt ngày 2 lần với sữa rửa mặt dịu nhẹ để làm sạch bụi bẩn
            </li>
            <li> Dùng kem chống nắng hàng ngày để bảo vệ da khỏi tia UV</li>
            <li>Có thể sử dụng serum chứa vitamin C để giúp da sáng khỏe</li>
          </ul>
        </Paragraph>

        {/* Da dầu */}
        <Title level={3} className="skin-title">
          2. Da dầu(Oily Skin){" "}
        </Title>
        <Paragraph>
          Da dầu (da nhờn) là tình trạng da dày, bóng nhờn, lỗ chân lông to và
          dễ gây ra mụn do tuyến bã nhờn hoạt động quá mức. Tuy nhiên, không
          phải ai cũng hiểu rõ da dầu là gì để có cách chăm sóc da hiệu quả
          nhất.
        </Paragraph>
        <Title level={4} className="sub-title">
          2.1 Đặc điểm
        </Title>
        <Image
          src="https://www.kiehls.com.vn/on/demandware.static/-/Sites-kiehls-vn-ng-Library/vi_VN/dwf27718bb/images/optimize/Tos_Team/da-dau-new/da-dau-1.jpg"
          alt="Da dầu"
          className="skin-image"
        />
        <Paragraph>
          <ul>
            <li>Tuyến bã nhờn hoạt động mạnh, khiến da bóng dầu</li>
            <li>Lỗ chân lông to, đặc biệt là ở vùng chữ T (trán, mũi, cằm)</li>
            <li>Dễ bị mụn đầu đen, mụn trứng cá do bít tắc lỗ chân lông</li>
            <li>Da có xu hướng dày hơn, dễ bị oxy hóa gây xỉn màu</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          2.2 Ưu điểm
        </Title>
        <Paragraph>
          <ul>
            <li> Da ít bị lão hóa hơn vì dầu tự nhiên giúp giữ ẩm</li>
            <li> Làn da có độ đàn hồi tốt hơn so với da khô</li>
          </ul>
        </Paragraph>
        <Title level={4} className="sub-title">
          2.3 Nhược điểm
        </Title>
        <Paragraph>
          <ul>
            <li>Dễ bị mụn nếu không kiểm soát dầu tốt</li>
            <li>Khó giữ lớp trang điểm lâu do dầu làm trôi nhanh</li>
          </ul>
        </Paragraph>
        <Title level={4} className="sub-title">
          2.4 Cách chăm sóc
        </Title>
        <Paragraph>
          <ul>
            <li>
              Sử dụng sữa rửa mặt chứa thành phần kiểm soát dầu như salicylic
              acid, niacinamide
            </li>
            <li>
              Dùng toner chứa BHA/AHA để giúp làm sạch sâu và thu nhỏ lỗ chân
              lông
            </li>
            <li>
              {" "}
              Hạn chế sản phẩm có kết cấu dày, ưu tiên gel dưỡng ẩm hoặc lotion
            </li>
            <li>Tẩy tế bào chết 2 lần/tuần để loại bỏ dầu thừa và ngăn mụn</li>
            <li> Dùng giấy thấm dầu khi cần thiết nhưng không lạm dụng</li>
          </ul>
        </Paragraph>
        <Title level={3} className="skin-title">
          3.Da Khô (Dry Skin)
        </Title>
        <Paragraph>
          Da khô là tình trạng da thiếu dầu tự nhiên, dẫn đến cảm giác khô căng,
          dễ bong tróc, đặc biệt trong thời tiết lạnh.
        </Paragraph>

        <Image
          src="https://paulaschoice.vn/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/08/phan-biet-da-kho-va-da-mat-nuoc-2.jpg.webp"
          alt="Da Khô"
          className="skin-image"
        />

        <Title level={4} className="sub-title">
          3.1 Đặc điểm
        </Title>
        <Paragraph>
          <ul>
            <li>Thiếu dầu tự nhiên, khiến da thô ráp, căng khô.</li>
            <li>Dễ bong tróc, đặc biệt vào mùa đông.</li>
            <li>Lỗ chân lông nhỏ, ít bị mụn nhưng dễ có nếp nhăn.</li>
            <li>Dễ bị kích ứng và nhạy cảm với thời tiết, mỹ phẩm.</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          3.2 Ưu điểm
        </Title>
        <Paragraph>
          <ul>
            <li>Ít bị mụn do không có quá nhiều dầu thừa.</li>
            <li>Lỗ chân lông nhỏ, giúp da trông mịn màng.</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          3.3 Nhược điểm
        </Title>
        <Paragraph>
          <ul>
            <li>Dễ xuất hiện nếp nhăn và lão hóa sớm.</li>
            <li>
              Nếu không cấp ẩm đầy đủ, da có thể trở nên bong tróc, nứt nẻ.
            </li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          3.4 Cách chăm sóc
        </Title>
        <Paragraph>
          <ul>
            <li>
              Sử dụng sữa rửa mặt dạng kem hoặc sữa, tránh sản phẩm chứa xà
              phòng mạnh.
            </li>
            <li>
              Dùng kem dưỡng ẩm chứa hyaluronic acid, ceramides, glycerin để giữ
              nước.
            </li>
            <li>
              Uống đủ nước và ăn thực phẩm giàu omega-3 để cải thiện độ ẩm tự
              nhiên.
            </li>
            <li>Sử dụng xịt khoáng để cấp ẩm tức thì khi cần.</li>
            <li>Dùng dầu dưỡng như dầu argan, dầu jojoba để khóa ẩm cho da.</li>
          </ul>
        </Paragraph>
        <Title level={3} className="skin-title">
          4. Da Hỗn Hợp (Combination Skin)
        </Title>
        <Paragraph>
          Da hỗn hợp là sự kết hợp giữa da dầu và da khô, thường có vùng chữ T
          (trán, mũi, cằm) nhiều dầu trong khi hai bên má lại khô hoặc bình
          thường.
        </Paragraph>

        <Image
          src="https://images-1.eucerin.com/~/media/eucerin/local/vn/da-hon-hop-thien-dau-la-gi/cac-buoc-cham-soc-da-hon-hop-thien-dau.jpg"
          alt="Da Hỗn Hợp"
          className="skin-image"
        />

        <Title level={4} className="sub-title">
          4.1 Đặc điểm{" "}
        </Title>
        <Paragraph>
          <ul>
            <li>Vùng chữ T (trán, mũi, cằm) thường tiết dầu, dễ bị mụn.</li>
            <li>Hai bên má có xu hướng khô hoặc bình thường.</li>
            <li>Lỗ chân lông to ở vùng chữ T nhưng nhỏ hơn ở hai bên má.</li>
            <li>Dễ bị mất cân bằng nếu không chăm sóc đúng cách.</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          4.2 Ưu điểm{" "}
        </Title>
        <Paragraph>
          <ul>
            <li>
              Không quá khô cũng không quá dầu, có thể duy trì độ ẩm tốt nếu
              chăm sóc đúng cách.
            </li>
            <li>Ít nhạy cảm hơn so với da khô hoặc da dầu.</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          4.3 Nhược điểm
        </Title>
        <Paragraph>
          <ul>
            <li>
              Khó chọn sản phẩm chăm sóc vì cần cân bằng giữa dưỡng ẩm và kiểm
              soát dầu.
            </li>
            <li>Dễ bị mụn ở vùng chữ T nhưng lại khô ở vùng má.</li>
          </ul>
        </Paragraph>

        <Title level={4} className="sub-title">
          4.4 Cách chăm sóc
        </Title>
        <Paragraph>
          <ul>
            <li>
              Sử dụng sữa rửa mặt dịu nhẹ giúp làm sạch nhưng không làm khô da.
            </li>
            <li>Dùng toner không chứa cồn để cân bằng độ pH cho da.</li>
            <li>
              Chọn kem dưỡng ẩm dạng gel hoặc lotion nhẹ để cấp ẩm nhưng không
              gây bít tắc lỗ chân lông.
            </li>
            <li>
              Tránh dùng sản phẩm quá nặng hoặc quá nhẹ, nên chọn sản phẩm phù
              hợp cho từng vùng da.
            </li>
            <li>
              Đắp mặt nạ đất sét cho vùng chữ T để kiểm soát dầu và dưỡng ẩm nhẹ
              cho vùng má.
            </li>
          </ul>
        </Paragraph>
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
