import React from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function Dashboard() {
  // Static data for demonstration
  const dashboardData = {
    totalStudents: 120,
    activeCourses: 15,
    completedCourses: 30,
    totalTeachers: 10,
    weeklyEngagement: [12, 19, 3, 5, 2, 3, 7],
  };

  return (
    <div className="content">
      <Row>
        {[
          {
            title: "Total Students",
            value: dashboardData.totalStudents,
            icon: "nc-hat-3",
            color: "info",
          },
          {
            title: "Active Courses",
            value: dashboardData.activeCourses,
            icon: "nc-book-bookmark",
            color: "success",
          },
          {
            title: "Completed Courses",
            value: dashboardData.completedCourses,
            icon: "nc-check-2",
            color: "warning",
          },
          {
            title: "Total Teachers",
            value: dashboardData.totalTeachers,
            icon: "nc-single-02",
            color: "primary",
          },
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
              <Line
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      label: "Engagement",
                      data: dashboardData.weeklyEngagement,
                      borderColor: "rgba(75,192,192,1)",
                      backgroundColor: "rgba(75,192,192,0.2)",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                height={100}
              />
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
