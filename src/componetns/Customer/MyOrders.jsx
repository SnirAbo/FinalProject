import { Box, Typography, Paper } from '@mui/material';
import {Table , TableBody , TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

import { collection, query, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react';

const MyOrdersComp = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products) ;
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const q = query(collection(db, 'products'));
         onSnapshot(q, (querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: 'LOAD_PRODUCT', payload: products });
        });
      }, []);
    
return (
    <>
    <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 , maxWidth: 450, margin: 'auto', padding: 3, }}>
    <Typography sx={{ mt:1, margin: 'auto' }} variant="h4" fontWeight="bold">Orders</Typography>
<TableContainer  sx={{ maxWidth:450 }} component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {products.map((product) => {
                const myPurchases = product.boughtBy.filter(user => user.name === `${currentUser.firstName} ${currentUser.lastName}`.toLowerCase());
                return myPurchases.map(order => (
                     
                    <TableRow key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell align="right"> {product.title}</TableCell>
                    <TableCell align="right">{order.quantity}</TableCell>
                    <TableCell align="right">{order.quantity * product.price}</TableCell>
                    <TableCell align="right">{new Date(order.date.seconds * 1000).toLocaleDateString()}</TableCell>
                  </TableRow>
                ));

            })}          
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
 );
}

export default MyOrdersComp;
