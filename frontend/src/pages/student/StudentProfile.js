import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Local state for personal information (editable)
  const [formData, setFormData] = useState({
    dob: 'January 1, 2000', 
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main Street, City, Country',
    emergencyContact: '(987) 654-3210',
  });

  // Retrieve data from localStorage if available
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('studentData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save updated data to localStorage
  const saveChanges = () => {
    localStorage.setItem('studentData', JSON.stringify(formData));
    console.log('Updated Data:', formData);
    setIsEditing(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Student Roll No: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Class: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  School: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Date of Birth"
                    fullWidth
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Date of Birth:</strong> {formData.dob}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Gender"
                    fullWidth
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Gender:</strong> {formData.gender}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Email:</strong> {formData.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Phone"
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Phone:</strong> {formData.phone}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Address"
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Address:</strong> {formData.address}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <TextField
                    label="Emergency Contact"
                    fullWidth
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="subtitle1" component="p">
                    <strong>Emergency Contact:</strong> {formData.emergencyContact}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box mt={2} textAlign="center">
              {isEditing ? (
                <>
                  <Button variant="contained" color="primary" onClick={saveChanges}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={toggleEdit} style={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outlined" color="primary" onClick={toggleEdit}>
                  Edit Information
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
