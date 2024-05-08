import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Jumbotron } from 'react-bootstrap';


export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student"); // or "mentor"
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAdddUser = () => {
    setShowForm(true);
  };

  const handleAddUser = async () => {
    try {
      // Make API call to add user
      const response = await axios.post("/api/addUser", { email, userType });
      setSuccessMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  

  return (
    <div>
      <div>
      <Jumbotron
        style={{
          height: "100px",
          padding: "0px",
          fontFamily: "Raleway",
          backgroundColor: "#001340",
        }}
      >
        <img
          style={{
            height: "100px",
          }}
          src={process.env.PUBLIC_URL + "/msit_new_logo.png"}
          alt="MSIT Logo"
          align="left"
        />
        <br />
        <h1 style={{ color: "white" , fontWeight:"bold" }}>Admin Dashboard</h1>
        {/* <hr style={{ color: "#6E85BA" }} /> */}
      </Jumbotron>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
      <Button variant="primary" onClick={handleAdddUser}>
          Add User
        </Button>
        {showForm && (
        <Form>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="userType">
          <Form.Label>User Type</Form.Label>
          <Form.Control
            as="select"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Form>
      )}
      </div>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
}
