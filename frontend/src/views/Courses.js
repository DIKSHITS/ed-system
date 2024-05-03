import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Table,
  Row,
  Col,
} from 'reactstrap';


const SubscribedCourseTable = ({ subscriptions, handleUnsubscribe }) => (
  <Table className="custom-table">
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Course Name</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {subscriptions.map((subscription, index) => (
        <tr key={subscription._id}>
          <td>{index + 1}</td>
          <td>{subscription.courseId.name}</td>
          <td>${subscription.courseId.price}</td>
          <td>{subscription.courseId.duration}</td>
          <td>
            <Button color="danger" onClick={() => handleUnsubscribe(subscription)}>
              Unsubscribe
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSubscriptions();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions([]);
    }
  };

  const handleSubscribe = async (course) => {
    const confirmSubscription = window.confirm(`Do you want to subscribe to ${course.name} course?`);
    
    if (confirmSubscription) {
      try {
        await axios.post('http://localhost:3001/api/subscribe', { courseId: course._id });
        alert('Subscription successful!');
        fetchSubscriptions();
      } catch (error) {
        console.error('Error subscribing:', error);
        alert('Failed to subscribe to the course.');
      }
    }
  };

  const handleUnsubscribe = async (subscription) => {
    const confirmUnsubscribe = window.confirm(`Do you want to unsubscribe from ${subscription.courseId.name} course?`);

    if (confirmUnsubscribe) {
      try {
        await axios.delete(`http://localhost:3001/api/unsubscribe/${subscription._id}`);
        alert('Unsubscription successful!');
        fetchSubscriptions();
      } catch (error) {
        console.error('Error unsubscribing:', error);
        alert('Failed to unsubscribe from the course.');
      }
    }
  };
  
const CourseTile = ({ course, handleSubscribe }) => (
    <Col md="6" lg="4">
      <Card className="mb-4">
        <CardHeader>
          <h5 className="title">{course.name}</h5>
        </CardHeader>
        <CardBody>
          <CardTitle>Price: ${course.price}</CardTitle>
          <CardText>Duration: {course.duration}</CardText>
          <Button color="primary" onClick={() => handleSubscribe(course)}>
            Subscribe
          </Button>
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <div className="content">
      <div className="mb-4">
        <h2>Available Courses</h2>
        <Row>
          {courses.map((course) => (
            <CourseTile key={course._id} course={course} handleSubscribe={handleSubscribe} />
          ))}
        </Row>
      </div>
      <div>
        <h2>Subscribed Courses</h2>
        <SubscribedCourseTable subscriptions={subscriptions} handleUnsubscribe={handleUnsubscribe} />
      </div>
    </div>
  );
};

export default CourseTable;
