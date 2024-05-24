import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import Logout from "../Logout";
export default function AdminDashboard(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [batch, setBatch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    // Additional logic for file change if needed
    console.log("File selected:", e.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      const response = await axios.post("http://127.0.0.1:5000/add-users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      setSuccessMessage("File uploaded successfully");
      setErrorMessage("");
      // Clear the file input
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setErrorMessage("Error uploading file");
      setSuccessMessage("");
    }
  };
  const handleClear = () => {
    setName("");
    setEmail("");
    setIdNumber("");
    setPhoneNumber("");
    setRole("");
    setBatch("");
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      idNumber,
      phoneNumber,
      role,
      batch,
    };
    try {
      const response = await axios.post("http://127.0.0.1:5000/add-users/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.data.success) {
        throw new Error("Failed to add user");
      }
      console.log("User added successfully");
      setSuccessMessage("User added successfully");
      setErrorMessage("");
      // Reset form fields after successful submission
      setName("");
      setEmail("");
      setIdNumber("");
      setPhoneNumber("");
      setRole("");
      setBatch("");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Error adding user");
      setSuccessMessage("");
    }
  };
  return (
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
        <h1 style={{ color: "white", fontWeight: "bold" }}>Admin Dashboard</h1>
      </Jumbotron>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px",marginBottom: '10px',}}>
        <Button  variant="primary" onClick={() => { setShowModal(true); setSelectedAction("addUser"); }}>
          Add User
        </Button>
        <Button variant="secondary" onClick={() => { setShowModal(true); setSelectedAction("uploadData"); }}>
          Upload CSV
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAction === "addUser" ? "Add User" : "Upload CSV"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAction === "addUser" && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="idNumber">
                <Form.Label>ID Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="batch">
                <Form.Label>Batch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" type="button" onClick={handleClear} style={{marginLeft:'15px'}}>
                  Clear
                </Button>
            </Form>
          )}
          {selectedAction === "uploadData" && (
            <div style={{ marginTop: "1.5rem" }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload CSV File</Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{padding:"4rem 8rem"}}
                />
              </Form.Group>
              <Button
                type="button"
                onClick={handleUpload}
                style={{
                  alignSelf: "center",
                  padding: "1rem 4rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  borderRadius: "0.75rem",
                }}
              >
                Upload
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Logout/>
    </div>
  );
}