import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel,Table, TableHead, TableRow, TableCell, TableBody  } from '@mui/material';
import axios from 'axios';
import { Navbar, NavbarBrand } from "reactstrap"; // Changed import statement
import Logo from "./grx.png"

function App() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
    dcId: 'None',
    cbzndc: 'False',
    givelabs: 'False'
  });

  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [createErrors, setCreateErrors] = useState({}); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data before submission
    try {
      const errors = {};
      if (!formData.fname) {
        errors.fname = "First Name is required";
      }
      if (!formData.lname) {
        errors.lname = "Last Name is required";
      }

      if (!formData.email) {
        errors.email = "Email is required";
      }
      if (!formData.contact) {
        errors.contact = "Contact Number is required";
      }
      if (Object.keys(errors).length > 0) {
        setCreateErrors(errors);


        return; // Stop form submission if there are errors
      }
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      };
      const response = await axios.post("http://localhost:4001/api/v1/entry/new", formData,config);
      console.log("Response:", response.data); // Log response after submission
      // Reset form fields after successful submission
      setFormData({
        fname: '',
        lname: '',
        email: '',
        contact: '',
        dcId: 'None',
        cbzndc: 'False',
        givelabs: 'False'
      });
      // Reload users data after successful submission
      fetchUsers();
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/v1/entries');
      const reversedUsers = response.data.entries.reverse();
      setUsers(reversedUsers);
      setUsersCount(response.data.entries.length)
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar style={{ backgroundImage: "linear-gradient(to right, darkred, red)", color: "#fff", padding: "0 20px", paddingTop: "15px" }}>
        <Container>
          <NavbarBrand style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ width: "70px", marginRight: "20px" }} />
            <Typography variant="h6">Grayhawks Esports</Typography>
          </NavbarBrand>
        </Container>
      </Navbar>
     
     
      <Container maxWidth="lg" style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        <div>
          <Typography variant="h5" component="h2" gutterBottom>Registration Form</Typography>
          <form >
            <TextField
              label="First Name"
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Typography> {createErrors.fname && <span className="text-danger" style={{color:"red"}}>{createErrors.fname}</span>}</Typography>
            <TextField
              label="Last Name"
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Typography> {createErrors.lname && <span className="text-danger" style={{color:"red"}}>{createErrors.lname}</span>}</Typography>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Typography> {createErrors.email && <span className="text-danger" style={{color:"red"}}>{createErrors.email}</span>}</Typography>
            <TextField
              label="Contact Number"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Typography> {createErrors.contact && <span className="text-danger" style={{color:"red"}}>{createErrors.contact}</span>}</Typography>
             <TextField
                label="Discord ID"
                type="text"
                name="dcId"
                value={formData.dcId}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="cbzndc-label">CBZN Discord</InputLabel>
                <Select
                  labelId="cbzndc-label"
                  id="cbzndc"
                  name="cbzndc"
                  value={formData.cbzndc}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="True">True</MenuItem>
                  <MenuItem value="False">False</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="givelabs-label">Givelabs Requirements</InputLabel>
                <Select
                  labelId="givelabs-label"
                  id="givelabs"
                  name="givelabs"
                  value={formData.givelabs}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="True">True</MenuItem>
                  <MenuItem value="False">False</MenuItem>
                </Select>
              </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </form>
        </div>
        <div>
 
          <Typography variant="h5" component="h2" gutterBottom>Total Entries:{usersCount}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Discord ID</TableCell>
                <TableCell>CBZN Discord</TableCell>
                <TableCell>Givelabs Requirements</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.fname}</TableCell>
                  <TableCell>{user.lname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.dcId}</TableCell>
                  <TableCell>{user.cbzndc}</TableCell>
                  <TableCell>{user.givelabs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default App;
