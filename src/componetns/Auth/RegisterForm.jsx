import { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import db from '../../firebase';  
import {
  addDoc,
  collection,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const RegisterFormComp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: 'user',  
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,  
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();  
    dispatch({ type: 'ADD_USER', payload: formData });
    await addDoc(collection(db, 'users'), formData); 
    alert(`User registered: ${formData.userName}`);  
    console.log(formData); 

  };

  return (
    <Container maxWidth="sm" >
  <Box sx={{ mt: 4 }}>
  <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
      </Grid>
    </Grid>
    <form onSubmit={handleSubmit}>
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center" 
        spacing={3}  
      >
        <Grid item>
          <TextField
            label="First Name"
            name="firstName"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <TextField
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <TextField
            label="Username"
            name="userName"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }} 
          />
        </Grid>

        <Grid item>
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </Box>
</Container>
  );
};

export default RegisterFormComp;