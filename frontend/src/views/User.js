import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Spinner,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

function User() {
  const email = sessionStorage.getItem("email");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    phone: ''
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://ed-system.onrender.com/Profile', { params: { email } });
        setUserList(response.data);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = (userData) => {
    setFormData({
      username: userData.username || '',
      phone: userData.phone || ''
    });
    setEditing(true);
  };

  const validateForm = () => {
    const { username, phone } = formData;
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone must be a valid 10-digit number.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('https://ed-system.onrender.com/update-profile', {
        email,
        username: formData.username,
        phone: formData.phone
      });
      console.log("Profile updated successfully:", response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner color="primary" className="loading-spinner">Loading...</Spinner>;
  }

  return (
    <div className="content">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="card-user">
            <div className="image">
              <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
            </div>
            {error && <Alert color="danger">{error}</Alert>}
            {!editing && userList.map((userData, index) => (
              <CardBody key={index} className="user-card-body">
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={userData.profileImage || require("assets/img/mike.jpg")}
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <h5 className="title text-danger">{userData.username}</h5>
                  </a>
                  <br />
                  <Table>
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>{userData.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{userData.phone}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{userData.category}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div>
                    <Button color="danger" style={{ width: '150px' }} onClick={() => handleEditClick(userData)}> Edit Profile </Button>
                  </div>
                </div>
              </CardBody>
            ))}
            {editing && (
              <CardBody className="user-card-body">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username">Name</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your Name"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div>
                    <Button color="primary" style={{ width: '150px' }} type="submit"> Save Changes </Button>
                    <Button color="secondary" style={{ width: '150px', marginLeft: '20px' }} onClick={() => setEditing(false)}> Go Back </Button>
                  </div>
                </Form>
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default User;
