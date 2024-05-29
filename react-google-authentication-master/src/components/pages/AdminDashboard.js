import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Form, Jumbotron, Modal, Tab, Tabs } from "react-bootstrap";
import Logout from "../Logout";
export default function AdminDashboard(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [batch, setBatch] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tabKey, setTabKey] = useState('addUser');
  const fileInputRef = useRef(null);
  const [countryCode, setCountryCode] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);
  const [unaddedUsers, setUnaddedUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); 

  
  
  
  const handleFileChange = (e) => {
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

      setAddedUsers(response.data.added_users);
      setUnaddedUsers(response.data.unadded_users);
      setShowUsers(true);

      setUploadSuccessMessage("File uploaded successfully");
      setUploadErrorMessage("");
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setUploadErrorMessage("Error uploading file");
      setUploadSuccessMessage("");
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setIdNumber("");
    setPhoneNumber("");
    setRole("");
    setBatch("");
  };

  const handleNameChange = (value) => {
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    validateEmail(value);
  };

  const handleIDNumberChange = (value) => {
    setIdNumber(value);
    validateID(value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const validateName = (value) => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(value)) {
      setNameErrorMessage("Name should contain only letters and spaces.");
      return false;
    }
    setNameErrorMessage("");
    return true;
  };

  const validateEmail = (value) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@msitprogram\.net$/;
    if (!emailPattern.test(value)) {
      setEmailErrorMessage("Email should be in the format user@msitprogram.net.");
      return false;
    }
    setEmailErrorMessage("");
    return true;
  };

  const validateID = (value) => {
    const idPattern = /^\d+$/;
    if (!idPattern.test(value)) {
      setIdNumberErrorMessage("ID Number should contain only numbers.");
      return false;
    }
    setIdNumberErrorMessage("");
    return true;
  };

  const validatePhoneNumber = (value) => {
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(value)) {
      setPhoneNumberErrorMessage("Phone number should contain only numbers.");
      return false;
    }
    if (value.length !== 10) {
        setPhoneNumberErrorMessage("Phone number must be exactly 10 digits.");
        return false;
      }
    setPhoneNumberErrorMessage("");
    return true;
  };

  const validateForm = () => {
    if (!validateName(name)) return false;
    if (!validateEmail(email)) return false;
    if (!validateID(idNumber)) return false;
    if (!validatePhoneNumber(phoneNumber)) return false;
    if (role === "student" && batch.trim() === "") {
      setFormErrorMessage("Batch is mandatory for students.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setIdNumberErrorMessage("");
    setPhoneNumberErrorMessage("");
    setFormSuccessMessage("");
    setFormErrorMessage("");

    if (!validateForm()) {
        return;
    }

    const userData = {
        name,
        email,
        id_number: idNumber,
        phone_number: phoneNumber,
        role,
        batch: role === "student" ? batch : null,
    };
    

    try {
      const response = await axios.post("http://127.0.0.1:5000/add-users/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      console.log("Server response:", response);
      console.log("Server response data:", response.data);
    
      // Check if the user was added successfully
      if (!response.data || response.data.added_users.length === 0) {
        // Throw an error if the user was not added successfully
        throw new Error("Failed to add user");
      }
    
      // User added successfully
      console.log("User added successfully");
      setFormSuccessMessage("User added successfully");
      handleClear();
    } catch (error) {
      // Handle the error
      console.error("Error:", error.message);
      setFormErrorMessage(error.message || "Error adding user");
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
          src={"/msit_new_logo.png"}
          alt="MSIT Logo"
          align="left"
        />
        <br />
        <h1 style={{ color: "white", fontWeight: "bold" }}>Admin Dashboard</h1>
      </Jumbotron>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
      
      <Button
    variant="primary"
    onClick={() => setShowModal(true)}
    style={{
      backgroundColor: '#001340',
      borderColor: '#007bff',
      color: '#fff',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '0.25rem'
    }}
  >
    Add User
  </Button>
      </div>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Admin Actions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
            <Tab eventKey="addUser" title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PersonAddAltIcon style={{ marginRight: '0.5rem' }} />
            Add user
          </div>
        }>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={(e) => validateName(e.target.value)}
                  />
                  {nameErrorMessage && <p className="text-danger" style={{ fontSize: "0.9em" }}>{nameErrorMessage}</p>}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
                  {emailErrorMessage && <p className="text-danger" style={{ fontSize: "0.9em" }}>{emailErrorMessage}</p>}
                </Form.Group>
                <Form.Group controlId="idNumber">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID number"
                    value={idNumber}
                    onChange={(e) => handleIDNumberChange(e.target.value)}
                    onBlur={(e) => validateID(e.target.value)}
                  />
                  {idNumberErrorMessage && <p className="text-danger" style={{ fontSize: "0.9em" }}>{idNumberErrorMessage}</p>}
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                    <Form.Control
                      as="select"
                      style={{ width: "auto", marginLeft: "10px" }}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="91">+91 (India)</option>
                      <option value="1">+1 (United States)</option>
  <option value="44">+44 (United Kingdom)</option>
  <option value="91">+91 (India)</option>
  <option value="61">+61 (Australia)</option>
  <option value="81">+81 (Japan)</option>
  <option value="49">+49 (Germany)</option>
  <option value="33">+33 (France)</option>
  <option value="55">+55 (Brazil)</option>
  <option value="86">+86 (China)</option>
  <option value="7">+7 (Russia)</option>
  <option value="39">+39 (Italy)</option>
  <option value="34">+34 (Spain)</option>
  <option value="47">+47 (Norway)</option>
  <option value="46">+46 (Sweden)</option>
  <option value="31">+31 (Netherlands)</option>
  <option value="32">+32 (Belgium)</option>
  <option value="52">+52 (Mexico)</option>
  <option value="27">+27 (South Africa)</option>
  <option value="82">+82 (South Korea)</option>
  <option value="64">+64 (New Zealand)</option>
  <option value="20">+20 (Egypt)</option>
  <option value="234">+234 (Nigeria)</option>
  <option value="92">+92 (Pakistan)</option>
  <option value="90">+90 (Turkey)</option>
  <option value="45">+45 (Denmark)</option>
                      {/* Add more country codes as needed */}
                    </Form.Control>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      maxLength="10"
                      onChange={(e) => handlePhoneNumberChange(e.target.value)}
                      onBlur={(e) => validatePhoneNumber(e.target.value)}
                    />
                  </div>
                  {phoneNumberErrorMessage && <p className="text-danger" style={{ fontSize: "0.9em" }}>{phoneNumberErrorMessage}</p>}
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='none'>none</option>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                  </Form.Control>
                </Form.Group>
                {role === "student" && (
                  <Form.Group controlId="batch">
                    <Form.Label>Batch</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    />
                  </Form.Group>
                )}
                <Button variant="primary" type="submit" style={{backgroundColor:'#001340'}}>
                  Submit
                </Button>
                <Button variant="secondary" type="button" onClick={handleClear} style={{ marginLeft: '15px' }}>
                  Clear
                </Button>
                {formSuccessMessage && <p className="text-success mt-3">{formSuccessMessage}</p>}
                {formErrorMessage && <p className="text-danger mt-3">{formErrorMessage}</p>}
              </Form>
            </Tab>
            <Tab eventKey="uploadCsv" title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UploadFileIcon style={{ marginRight: '0.5rem' }} />
            Upload CSV
          </div>
        }>
              <div style={{ marginTop: "1.5rem" }}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload CSV File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ padding: "4rem 8rem" }}
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
                    backgroundColor: "#001340",
                    borderRadius: "0.75rem",
                  }}
                >
                  <CloudUploadIcon style={{ marginRight: "0.5rem" }} />
                  Upload
                </Button>
                {uploadSuccessMessage && <p className="text-success">{uploadSuccessMessage}</p>}
                {uploadErrorMessage && <p className="text-danger">{uploadErrorMessage}</p>}
                {showUsers && (
  <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "0.5rem" }}>
    <div style={{ color: 'green' }}><h5>Added Users</h5></div>
    {addedUsers.length > 0 ? (
      <ul>
        {addedUsers.map((user, index) => (
          <li key={index}>{user[1]}</li>
        ))}
      </ul>
    ) : (
      <p>No users added.</p>
    )}

    <div style={{ marginTop: "1rem" }}>
      <div style={{ color: 'red' }}><h5>Unadded Users</h5></div>
      {unaddedUsers.length > 0 ? (
        <ul>
          {unaddedUsers.map((user, index) => (
            <li key={index}>{user[1]}</li>
          ))}
        </ul>
      ) : (
        <p>No users unadded.</p>
      )}
    </div>
    <div style={{ color: 'black', backgroundColor: '#F5F5F5', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem', lineHeight: '1.5' }}>
  <div style={{color:'red'}}><h5>Criteria to add users</h5></div>
  <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
    <li><p style={{ fontSize: '0.9em', margin: '0' }}>Name should only contain letters.</p></li>
    <li><p style={{ fontSize: '0.9em', margin: '0' }}>Email should be unique and in the format user@msitprogram.net.</p></li>
    <li><p style={{ fontSize: '0.9em', margin: '0' }}>Phone number should contain exactly 10 digits.</p></li>
    <li><p style={{ fontSize: '0.9em', margin: '0' }}>ID Number should contain only numbers.</p></li>
    <li><p style={{ fontSize: '0.9em', margin: '0' }}>All fields are mandatory and batch is mandatory for students.</p></li>
  </ul>
</div>
  </div>
)}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      <Logout/>
    </div>
  );
}
