import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import { Card, CardContent, Stack, TextField} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useState, useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { arrayUnion , updateDoc, doc} from 'firebase/firestore';
import db from '../../firebase';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.currentUser); // המשתמש הנוכחי
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }
  

  const handleAllOrders = async () => {
    if (!user || cart.length === 0) return;
  
    for (const product of cart) {
      const boughtByEntry = {
        name: `${user.firstName} ${user.lastName}`,
        date: new Date(),
        quantity: product.quantity,
      };
      await updateDoc(doc(db, "products", product.id), {
        boughtBy: arrayUnion(boughtByEntry),
      });
    }
  
    alert("Order placed!");
    dispatch({ type: 'CLEAR_CART' });
  };
  

  return (
    <Box
    sx={{ width: open ? 300 : 30,
        transition: "width 0.4s",
        backgroundColor: "#f5f5f5",
        borderTop: "3px solid limegreen",
        borderRight: "3px solid limegreen",
        height: 800,
        p: 2,
        position: "relative",}}>

      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "absolute",
          top: 10,
          right: -15,
          backgroundColor: "#eee",
          border: "1px solid #ccc",
          zIndex: 1,
           }} size="small">
        {open ? <ArrowBackIosIcon fontSize="small" /> : <ArrowForwardIosIcon fontSize="small" />}
      </IconButton>
    
      {open && cart.map((product) => (
    <Card key={product.id}>
        <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
      
      <Stack spacing={1}>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>In stock: {product.quantity}</Typography>
        <Typography>Price: ${product.quantity * product.price}</Typography>

      </Stack>
     </Stack>
        </CardContent>
        <Divider />
    </Card>
     ))}
    {open && (
    <Box sx={{ mt: 2 }}>
         <Typography variant="subtitle1"> Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} </Typography>
         <Typography variant="subtitle2"> Items: {cart.reduce((sum, item) => sum + item.quantity, 0)} </Typography>
         <Stack>
            <Button onClick={() => handleAllOrders()} variant="contained" color="success" sx={{ mt: 1 }}>
              Order
            </Button>
            <Button onClick={()=> clearCart()} variant="contained"  sx={{ mt: 1 , backgroundColor: 'grey'}}>Clear</Button>
            </Stack>
          </Box>
        )}
    </Box>


  );
};

export default Cart;
