import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      const { role } = JSON.parse(atob(res.data.token.split(".")[1]));
      navigate(`/${role}`);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" onChange={handleChange} required>
              <option value="user">User</option>
              <option value="teacher">Teacher</option>
            </Form.Select>
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Signup
          </Button>
        </Form>
        <div className="text-center">
          <span>Already have an account? </span>
          <Link to="/login">Go to Login</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Signup;
