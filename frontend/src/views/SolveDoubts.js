import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Input,
  Button
} from 'reactstrap';

function SolveDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const response = await axios.get('https://ed-system.onrender.com/api/doubts');
      setDoubts(response.data);
    } catch (error) {
      console.error('Error fetching doubts:', error);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSendAnswer = async (doubtId) => {
    try {
      await axios.put(`https://ed-system.onrender.com/api/doubts/${doubtId}`, { answer });
      // Assuming you want to refresh doubts after sending answer
      fetchDoubts();
      setAnswer(''); // Clear answer field after sending
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <h5 className="title">Doubts List</h5>
              <Table>
                <thead>
                  <tr>
                    <th>Sl. No</th>
                    <th>Faculty Name</th>
                    <th>Doubt Description</th>
                    <th>Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doubts.map((doubt, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{doubt.facultyName}</td>
                      <td>{doubt.doubtDescription}</td>
                      <td>{doubt.answer}</td>
                      <td>
                        {doubt.answer ? (
                          "Answered"
                        ) : (
                          <>
                            <Input
                              type="text"
                              value={answer}
                              onChange={handleAnswerChange}
                            />
                            <Button
                              color="primary"
                              onClick={() => handleSendAnswer(doubt._id)}
                            >
                              Send
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SolveDoubts;
