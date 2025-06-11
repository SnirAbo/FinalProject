import {useState, useEffect} from 'react';
import db from '../../firebase'
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import {  Link, useNavigate} from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useDispatch , useSelector} from 'react-redux';


const LoginFormComp = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setloginData] = useState({
        userName: '',
        password: ''
      });


    const handleChange = (e) => {
        setloginData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,  // Dynamically update the corresponding field in formData
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = query(collection(db, 'users'));
      onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id, 
            ...doc.data(),
            };
        })
        const user = users.find((user) => user.userName === loginData.userName && user.password === loginData.password);
        if (user) {
            dispatch({ type: 'LOGIN_USER', payload: user });
            alert(`Welcome ${user.userName}`);
            sessionStorage.setItem('user', JSON.stringify(user));
            navigate('/account');
        } else {
            alert('Invalid username or password');
        }
      })
    }
    
    
    
return (
    <>
    <Container maxWidth="sm"   sx={{ 
        backgroundColor: 'rgba(205, 205, 205, 0.5)', 
        border: '2px solid rgba(0, 0, 0, 0.1)', // Transparent border with rgba
        borderRadius: '8px', // Optional, gives rounded corners
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional, adds shadow for better visibility
        padding: '24px'
      }}>
  <Box sx={{ mt: 4 }}>
  <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Next Gen E-Commerence
        </Typography>
      </Grid>
    </Grid>
    <form onSubmit={handleSubmit}>

        <Grid item>
          <TextField
            label="Username"
            name="userName"
            onChange={handleChange}
            variant="outlined"
            fullWidth 
          />
        </Grid>

        <Grid item>
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            variant="outlined" 
            fullWidth 
          />
        </Grid>

        <Grid item>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth 
            >
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="center">
         New User ? <Link to='/register'>Register</Link>
          </Box>
        </Grid>
    </form>
  </Box>
</Container>
    </>
 );
}

export default LoginFormComp;
