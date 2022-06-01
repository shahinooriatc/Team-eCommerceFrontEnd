import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { state2, dispatch2 } = useContext(Store);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      isValid = false;
      toast.error("Enter your email address");
    } else if (typeof email !== "undefined") {
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        isValid = false;
        toast.error("Please entered a valid email address");
      }
    }
    if (!password) {
      isValid = false;
      toast.error("Enter a Password");
    } else if (typeof password !== "undefined") {
      if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        isValid = false;
        toast.error("Minimum eight characters, at least one letter, one number and one special character");
      }
    } else {
      setEmail("");
      setPassword("");
    }

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,

        // {
        //   headers: authoraization: `Bearer ${userInfo.token}`
        // }
      });

      toast.success("success");
      dispatch2({ type: "USER-SIGN-IN", payload: data });
      navigate("/");
    } catch (e) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <Container className="main">
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="authDesign">
        <Row className="auth">
          <Col className="auth_Part_One" lg="6">
            <h2>Sign In</h2>
            <small>New User? Create account</small>

            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                className="mb-2"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                className="mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button className="mt-3" variant="success" onClick={handleSubmit} size="lg">
                Sign In
              </Button>
            </Form>
          </Col>
          <Col className="auth_Part_Two" lg="6">
            <h2>Create Account</h2>
            <small>Create account to manage orders</small>
            <Link to="/registration">
              <Button className="mt-5" variant="success" size="lg">
                Create Account
              </Button>
            </Link>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <small className="text-muted">Term of Use. Privacy Policy</small>
        </div>
      </div>
    </Container>
  );
};

export default Login;
