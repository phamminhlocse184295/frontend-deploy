// import { useState, useEffect } from "react";
import { Pie, Line } from "@ant-design/charts";
import { Card, Col, Flex, Row, Space, Typography } from "antd";
import * as Icon from "@ant-design/icons";
import { useDashboardSummary } from "../features/dashboard/hooks/useGetDashboardSummary";
import { useTotalBookingsInMonth } from "../features/dashboard/hooks/useTotalBookingInMonth";
import { useTotalRevenueInMonth } from "../features/dashboard/hooks/useTotalRevenueInMonth";
import { useRoleCounts } from "../features/dashboard/hooks/useGetRoleCount";
import { useMonthlyBookingRevenue } from "../features/dashboard/hooks/useGetMonthlyBookingRevenue";

const Home = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   asyncFetch();
  // }, []);
  // const asyncFetch = () => {
  //   fetch(
  //     "https://gw.alipayobjects.com/os/antfincdn/YdLK%24VvSkW/fireworks-sales.json"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };

  // const config2 = {
  //   title: {
  //     visible: true,
  //     text: "Basic usage of single line chart",
  //   },
  //   description: {
  //     visible: true,
  //     text: "The most basic and simple way to use a line chart\uFF0C to show the trend of an indicator",
  //   },
  //   forceFit: true,
  //   data,
  //   padding: "auto",
  //   xField: "Date",
  //   yField: "scales",
  //   xAxis: {
  //     type: "dateTime",
  //     tickCount: 5,
  //   },
  // };

  const { data: dashboardSummaryData, isLoading: isLoadingDashboardSummary } =
    useDashboardSummary();

  const { data: totalBookingsData } = useTotalBookingsInMonth();
  const { data: totalRevenueData } = useTotalRevenueInMonth();
  const { data: roleCountsData } = useRoleCounts();
  const { data: monthlyBookingRevenue } = useMonthlyBookingRevenue();

  const pieData = roleCountsData
    ? roleCountsData.map(({ role, count }) => ({ type: role, value: count }))
    : [];

  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: "Thống kê số lượng",
    },
    description: {
      visible: true,
      text: "Số lượng của từng role",
    },
    radius: 0.8,
    data: pieData,
    angleField: "value",
    colorField: "type",
    // label: {
    //   visible: true,
    //   // type: "outer",
    //   offset: 20,
    // },
  };

  const lineData = monthlyBookingRevenue
    ? monthlyBookingRevenue.map(({ month, totalRevenue }) => ({
        month: `Tháng ${month}`,
        totalRevenue,
      }))
    : [];

  const config2 = {
    title: {
      visible: true,
      text: "Doanh thu theo tháng",
    },
    description: {
      visible: true,
      text: "Thống kê tổng doanh thu từng tháng",
    },
    data:
      lineData.length > 0
        ? lineData
        : [{ month: "Không có dữ liệu", totalRevenue: 0 }],
    xField: "month",
    yField: "totalRevenue",
    xAxis: {
      tickCount: 12,
    },
    yAxis: {
      label: {
        formatter: (v: number) => `${v.toLocaleString()} $`,
      },
    },
    // smooth: true,
    // point: {
    //   visible: true,
    //   size: 4,
    // },
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={6} md={12}>
          <Card style={{ height: "100%" }}>
            <Row justify="space-between">
              <Col xs={16} style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text type="secondary" strong={true}>
                  Tổng doanh thu
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title
                    level={3}
                    style={{ margin: 0 }}
                    ellipsis={true}
                  >
                    {isLoadingDashboardSummary
                      ? "Đang tải"
                      : dashboardSummaryData?.totalRevenue ?? 0}
                  </Typography.Title>
                  <Typography.Text
                    type="success"
                    strong={true}
                    ellipsis={true}
                  ></Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.DollarCircleTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={19} style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text type="secondary" strong={true}>
                  Tổng doanh thu trong tháng
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {totalRevenueData}
                  </Typography.Title>
                  <Typography.Text
                    type="success"
                    strong={true}
                  ></Typography.Text>
                </Space>
              </Col>
              <Col xs={5} style={{ textAlign: "center" }}>
                <Icon.RocketTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={18} style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text type="secondary" strong={true}>
                  Tổng số đặt trong tháng
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {totalBookingsData}
                  </Typography.Title>
                  <Typography.Text
                    type="danger"
                    strong={true}
                  ></Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.ContactsTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={16} style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text type="secondary" strong={true}>
                  Tổng số đặt
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0, width: 40 }}>
                    {isLoadingDashboardSummary
                      ? "Đang tải"
                      : dashboardSummaryData?.totalBookings ?? 0}
                  </Typography.Title>
                  <Typography.Text
                    type="warning"
                    strong={true}
                    ellipsis={true}
                  ></Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.ShoppingTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Flex style={{ marginTop: "20px", gap: "16px" }}>
          {/* <Row> */}
          <Col>
            <div className="chart">
              <Pie {...config} />
            </div>
          </Col>
          <Col>
            <div className="chart">
              <Line {...config2} />
            </div>
          </Col>
          {/* </Row> */}
        </Flex>
      </Row>
    </>
  );
};

export default Home;
