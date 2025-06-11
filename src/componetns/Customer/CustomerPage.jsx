import { Box, Typography, Stack, Button } from '@mui/material';
import { Link , Outlet , useNavigate} from 'react-router-dom';
import { useDispatch , useSelector  } from 'react-redux';


const CustomerPageComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));


    const logOut = () => {
        dispatch({ type: 'LOGOUT_USER'});
        sessionStorage.clear();
        navigate('/');
        alert("Logged out!");
    }
    
return (
    <>
    <Box>
      {/* כותרת */}
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Hello, {loggedUser.userName}
      </Typography>
      {/* תפריט ניווט */}
      <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 2 }}>
        <Button sx={{}} component={Link} to="myaccount">MyAccount</Button>
        <Button component={Link} to="orders">Orders</Button>
        <Button component={Link} to="products">Products</Button>
        <Button onClick={logOut}>Log Out</Button>
      </Stack>

        
    <Box sx={{ borderTop: '2px solid #ccc' }}>
        {/* פה ייכנס התוכן של הדפים הפנימיים */}
         <Box sx={{ mt: 4 }}>
            <Outlet />
         </Box>
    </Box>
    </Box>
    </>
 );
}

export default CustomerPageComp;
