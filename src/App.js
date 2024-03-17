import React, { useState, useEffect } from 'react';
import { Grid,Container, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel,Table, TableHead, TableRow, TableCell, TableBody  } from '@mui/material';
import axios from 'axios';
import { Navbar, NavbarBrand } from "reactstrap"; // Changed import statement

import Logo from "./grx.png"
import Day1 from "./Day1.jpg"
import Day2 from "./Day2.jpg"
import Day3 from "./Day3.jpg"
import Footer from "./Footer.png"
import { AppBar, Toolbar } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
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
      const response = await axios.post("https://grayhawksbackend.onrender.com/api/v1/entry/new", formData,config);
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
      const response = await axios.get('https://grayhawksbackend.onrender.com/api/v1/entries');
      const reversedUsers = response.data.entries.reverse();
      setUsers(reversedUsers);
      setUsersCount(response.data.entries.length)
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error (e.g., display error message to the user)
    }
  };
  const carouselItems = [
    { id: 1, image: Day1 },
    { id: 2, image: Day2 },
    { id: 3, image: Day3 }
  ];
  useEffect(() => {
    fetchUsers();
  }, []);
 // Logic to calculate index of the last entry on the current page
 const indexOfLastUser = currentPage * usersPerPage;
 // Logic to calculate index of the first entry on the current page
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 // Slice the users array to display only entries for the current page
 const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
    <style>
      {`
        body {
          background: linear-gradient(to top, rgba(255,0,0,0.5), rgba(255,255,255,0.5));
          font-family: 'Michroma', sans-serif;
        }
        .carousel-container {
          width: 80%; 
          margin: 0 auto; 
        }
      `}
    </style>
    <AppBar position="fixed">
      <Toolbar style={{ backgroundImage: "linear-gradient(to right, darkred, red)", color: "#fff", padding: "0 20px", paddingTop: "10px" }}>
        <img src={Logo} alt="Logo" style={{ width: "70px", marginRight: "20px" }} />
        <Typography variant="h6" style={{ fontFamily: 'Michroma, sans-serif', flexGrow: 1 }}>Grayhawks Esports</Typography>
        <Typography variant="h6" style={{ fontFamily: 'Michroma, sans-serif' }}>Esportsfest 2024</Typography>
      </Toolbar>
    </AppBar>
   

<Grid container style={{ height: '100vh', marginTop: '70px',paddingLeft:"20px" }} spacing={3}>

<Grid item xs={3}>
        
        <div >
          <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center',fontFamily: 'Michroma, sans-serif'  }}>Registration Form</Typography>
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
              InputProps={{
                style: { border: '2px solid maroon' },
              }}
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
              InputProps={{
                style: { border: '2px solid maroon' },
              }}
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
  InputProps={{
    style: { border: '2px solid maroon' },
  }}
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
              InputProps={{
                style: { border: '2px solid maroon' },
              }}
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
                InputProps={{
                  style: { border: '2px solid maroon' },
                }}
              />
              <FormControl fullWidth margin="normal" style={{ border: '2px solid maroon', borderRadius: '3px' }}> 
                <InputLabel id="cbzndc-label">CBZN Discord</InputLabel>
                <Select
                  labelId="cbzndc-label"
                  id="cbzndc"
                  name="cbzndc"
                  value={formData.cbzndc}
                  onChange={handleChange}
                  required
                  InputProps={{
                    style: { border: '2px solid maroon' },
                  }}
                >
                  <MenuItem value="True">True</MenuItem>
                  <MenuItem value="False">False</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" style={{ border: '2px solid maroon', borderRadius: '3px' }}>
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
  fullWidth
  sx={{
    marginTop: '1rem',
    backgroundColor: 'maroon',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Low opacity black
    },
  }}
  onClick={handleSubmit}
>
  Register
</Button>
          </form>
        </div>
        </Grid>

<Grid item xs={5}>
        <div>
 
          <Typography variant="h5" component="h2" gutterBottom style={{fontFamily: 'Michroma, sans-serif' }}>Total Entries:{usersCount}</Typography>
          <Table style={{ border: '4px solid maroon' }} responsive>
            <TableHead>
              <TableRow>
                <TableCell  style={{ borderBottom: '2px solid maroon' }}>First Name</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>Last Name</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>Email</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>Contact Number</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>Discord ID</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>CBZN Discord</TableCell>
                <TableCell style={{ borderBottom: '2px solid maroon' }}>Givelabs Requirements</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {currentUsers.map((user, index) => (
                <TableRow key={index} >
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.fname}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.lname}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.email}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.contact}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.dcId}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.cbzndc}</TableCell>
                  <TableCell style={{ borderBottom: '2px solid maroon' }}>{user.givelabs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
          <div style={{ textAlign: 'center' }}>
  {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
    <Button
      key={i}
      onClick={() => paginate(i + 1)}
      variant={currentPage === i + 1 ? 'contained' : 'outlined'}
      style={{ backgroundColor: 'maroon', color: 'white' }}
    >
      {i + 1}
    </Button>
  ))}
</div>
        </div>
        </Grid>

        <Grid item xs={4} responsive>
  <div style={{ height: '100%', width: '100%',paddingTop:"50px" }}>
  <Typography variant="h2" component="h2" gutterBottom style={{ textAlign: 'center', fontFamily: 'Michroma, sans-serif'  }}>
  Schedule
</Typography>
<div className="carousel-container" style={{border: '4px solid maroon' }}> {/* Set the width of this container */}
      <Slider {...settings}>
        {carouselItems.map(item => (
          <div key={item.id}>
            <img src={item.image} alt={`Day ${item.id}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  </div>
</Grid>

</Grid>
<div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
      <img src={Footer} alt="Footer" style={{ width: '100%', height: 'auto' }} />
    </div>
    </>
  );
}

export default App;
