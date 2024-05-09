import React, { useState } from "react";
import axios from "axios";
import { Jumbotron, Tabs, Tab } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
export default function AdminDashboard() {
  const [inputMode, setInputMode] = useState("single"); // "single" or "csv"
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student"); // or "mentor"
  const [csvFile, setCsvFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleAddUser = async () => {
    try {
      if (inputMode === "single") {
        // Make API call to add single user
        const response = await axios.post("/api/addUser", { email, userType });
        setSuccessMessage(response.data.message);
        setEmail("");
      } else {
        if (!csvFile) {
          setErrorMessage("Please select a CSV file.");
          return;
        }
        const formData = new FormData();
        formData.append("file", csvFile);
        formData.append("userType", userType);
        // Make API call to add users from CSV file
        const response = await axios.post("/api/addUsersFromCSV", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccessMessage(response.data.message);
        setCsvFile(null);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
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
        <h1 style={{ color: "white" }}>Admin Dashboard</h1>
        {/* <hr style={{ color: "#6E85BA" }} /> */}
      </Jumbotron>
      </div>
      <Form>
        <Form.Group controlId="inputMode">
          <Form.Label>Input Mode</Form.Label>
          <Form.Control
            as="select"
            value={inputMode}
            onChange={(e) => setInputMode(e.target.value)}
          >
            <option value="single">Single Email</option>
            <option value="csv">CSV File</option>
          </Form.Control>
        </Form.Group>
        {inputMode === "single" ? (
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        ) : (
          <Form.Group controlId="csvFile">
            <Form.Label>Upload CSV File</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </Form.Group>
        )}
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
          Add User(s)
        </Button>
      </Form>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
}