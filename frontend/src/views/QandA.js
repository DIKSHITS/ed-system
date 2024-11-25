import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from 'reactstrap';

function DoubtsPage() {
  const [facultyName, setFacultyName] = useState('');
  const [doubtDescription, setDoubtDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    fetchFaculties();
    fetchDoubts();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get('https://ed-system.onrender.com/api/faculties');
      setFaculties(response.data);
    } catch (error) {
      console.error('Error fetching faculty names:', error);
    }
  };

  const fetchDoubts = async () => {
    try {
      const response = await axios.get('https://ed-system.onrender.com/api/doubts');
      setDoubts(response.data);
    } catch (error) {
      console.error('Error fetching doubts:', error);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('facultyName', facultyName);
    formData.append('doubtDescription', doubtDescription);
    formData.append('pdfFile', pdfFile);

    try {
      await axios.post('https://ed-system.onrender.com/api/doubts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFacultyName('');
      setDoubtDescription('');
      setPdfFile(null);
      fetchDoubts(); // Refresh the doubts list after submission
    } catch (error) {
      console.error('Error submitting doubt:', error);
      setError('Error submitting doubt. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file) => {
    setPdfFile(file);
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Submit Doubts</h5>
            </CardHeader>
            <CardBody>
              {error && <div className="text-danger">{error}</div>}
              <FormGroup>
                <Label for="facultyName">Faculty Name:</Label>
                <Input
                  type="select"
                  id="facultyName"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                >
                  <option value="">Select Faculty Name</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty.username}>
                      {faculty.username}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="doubtDescription">Doubt Description:</Label>
                <Input
                  type="textarea"
                  id="doubtDescription"
                  value={doubtDescription}
                  onChange={(e) => setDoubtDescription(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pdfFile">Upload PDF:</Label>
                <Input
                  type="file"
                  id="pdfFile"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </FormGroup>
              <Button color="primary" onClick={handleSubmit} disabled={loading}>
                Submit
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
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
                  </tr>
                </thead>
                <tbody>
                  {doubts.map((doubt, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{doubt.facultyName}</td>
                      <td>{doubt.doubtDescription}</td>
                      <td>{doubt.answer}</td>
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

export default DoubtsPage;
