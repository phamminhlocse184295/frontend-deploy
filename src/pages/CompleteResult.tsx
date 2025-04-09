import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { PagePath } from "../enums/page-path.enum";

const CompleteBookingPage = () => (
  <Result
    status="success"
    title="Đặt dịch vụ thành công"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Link to={PagePath.HOME_PAGE}>
        <Button type="primary" key="goBack">
          Quay về trang chủ
        </Button>
      </Link>,
    ]}
  />
);

export default CompleteBookingPage;
