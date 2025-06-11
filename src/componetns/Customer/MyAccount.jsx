import { useState } from 'react';
import { TextField, Button, Grid, Container, Checkbox , Typography, Box } from '@mui/material';
import { collection, query, onSnapshot, doc ,updateDoc} from 'firebase/firestore';
import db from '../../firebase';  

const MyAccountComp = () => {
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));

    const [activeUser, setActiveUser] = useState({
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        userName: loggedUser.userName,
        password: loggedUser.password,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({activeUser});
        await updateDoc(doc(db, 'users', loggedUser.id), { ...activeUser });
        alert("User Updated!");

    }
    
    const handleChange = (e) => {
        setActiveUser((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,  // Dynamically update the corresponding field in formData
        }));
    }
    

return (
    <>
    <Box sx={{  pt:2, mt:1,  maxWidth: 300, margin: 'auto', padding: 3, backgroundColor: '#b2b2b2', borderRadius: 2, }}>
     <Box component="form" onSubmit={handleSubmit} sx={{  pt:2, mt:1,  maxWidth: 600, margin: 'auto', padding: 3, backgroundColor: 'white', borderRadius: 2, }}>
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center" 
        spacing={3}  
      >
        <Grid item>
          <TextField
            name="firstName"
            value={activeUser.firstName}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <TextField
            name="lastName"
            value={activeUser.lastName}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <TextField
            name="userName"
            value={activeUser.userName}
             onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }} 
          />
        </Grid>

        <Grid item>
          <TextField
            name="password"
            type="password"
            value={activeUser.password}
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
              sx={{ backgroundColor: 'limegreen', color: 'black'}}
            >
              Save
            </Button>
          </Box>

          <Typography>Allow others see my orders: </Typography>
          <Checkbox></Checkbox>
        </Grid>
      </Grid>
    </Box>

    </Box>   
    </>
 );
}

export default MyAccountComp;
