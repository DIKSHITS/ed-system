import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, Spinner } from "reactstrap";
import { dashboard24HoursPerformanceChart } from "variables/charts.js";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ed-system.onrender.com/admin/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <Spinner color="primary" />
        <p>Loading...</p>
      </div>
    );

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="content">
      <Row>
        {[
          { title: "Total Students", value: dashboardData?.totalStudents || "0", icon: "nc-hat-3", color: "info" },
          { title: "Active Courses", value: dashboardData?.activeCourses || "0", icon: "nc-book-bookmark", color: "success" },
          { title: "Completed Courses", value: dashboardData?.completedCourses || "0", icon: "nc-check-2", color: "warning" },
          { title: "Total Teachers", value: dashboardData?.totalTeachers || "0", icon: "nc-single-02", color: "primary" },
        ].map((item, index) => (
          <Col lg="3" md="6" sm="6" key={index}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className={`icon-big text-center icon-${item.color}`}>
                      <i className={`nc-icon ${item.icon} text-${item.color}`} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">{item.title}</p>
                      <CardTitle tag="p">{item.value}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Student Engagement</CardTitle>
              <p className="card-category">Weekly Activity Performance</p>
            </CardHeader>
            <CardBody>
              <Line data={dashboard24HoursPerformanceChart.data} options={dashboard24HoursPerformanceChart.options} width={400} height={100} />
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
