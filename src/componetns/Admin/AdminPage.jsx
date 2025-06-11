import { Box, Typography, Stack, Button } from '@mui/material';
import { Link , Outlet } from 'react-router-dom';

const AdminPageComp = () => {
return (
    <>
    <Box>
      {/* כותרת */}
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Hello, Admin
      </Typography>

      {/* תפריט ניווט */}
      <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 2 }}>
        <Button component={Link} to="/account">Account</Button>
        <Button component={Link} to="category">Categories</Button>
        <Button component={Link} to="product">Products</Button>
        <Button component={Link} to="customer">Customers</Button>
        <Button component={Link} to="statistics">Statistics</Button>
      </Stack>

        
    <Box sx={{ borderTop: '2px solid #ccc' }}>
         <Box sx={{ mt: 4 }}>
            <Outlet />
         </Box>
    </Box>
    </Box>
    </>
 );
}

export default AdminPageComp;
