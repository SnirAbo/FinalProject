import { Box, Typography, Paper, Button, TextField, Card, CardContent } from '@mui/material';
import {Table , TableBody , TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState ,useEffect } from 'react';
import { collection, query, onSnapshot, addDoc , deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch , useSelector } from 'react-redux';

const CustomerManagerComp = () => {
    const users = useSelector((state) => state.user.users);
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        const q = query(collection(db, 'users'));
      
        onSnapshot(q, (querySnapshot) => {
          const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          dispatch({ type: 'LOAD_USERS', payload: users });
        });
      }, []);

      useEffect(() => {
        const q = query(collection(db, 'products'));
      
        onSnapshot(q, (querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
      
          dispatch({ type: 'LOAD_PRODUCT', payload: products });
        });
      }, []);
    
return (
    <>
    <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 , maxWidth: 450, margin: 'auto', padding: 3, }}>
    <Typography sx={{ mt:1, margin: 'auto' }} variant="h4" fontWeight="bold">Customers</Typography>
<TableContainer  sx={{ maxWidth:450 }} component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Joined at</TableCell>
            <TableCell align="right">Products Bought</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, ) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="right">Check</TableCell>
              <TableCell align="right">{products.map((product) => {
                  const filteredEntries = product.boughtBy?.filter(
                    (entry) => `${entry.name}`.toLowerCase() === `${user.firstName} ${user.lastName}`.toLowerCase()
                  );
                
                  if (!filteredEntries || filteredEntries.length === 0) return null;
    return (
      
<TableContainer  sx={{ maxWidth:250 }} key={product.id} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">qty</TableCell>
            <TableCell align="right">date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {product.boughtBy?.filter(entry => `${entry.name}`.toLowerCase() === `${user.firstName} ${user.lastName}`.toLowerCase())
        .map((entry, index) => (
        <TableRow key={index}>
      <TableCell>{product.title}</TableCell>
      <TableCell align="right">{entry.quantity}</TableCell>
      <TableCell align="right">{new Date(entry.date.seconds * 1000).toLocaleDateString()}</TableCell>
    </TableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
    
              );
              } )}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
 );
}

export default CustomerManagerComp;
