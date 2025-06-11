import { Box, Typography, Paper, Button, TextField , Card, CardContent , Select, MenuItem, CardMedia } from '@mui/material';
import {Stack , Slider} from '@mui/material';

import {Table , TableBody , TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState ,useEffect } from 'react';
import { collection, query, onSnapshot, doc } from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch , useSelector } from 'react-redux';
import Cart from './Cart'

const ProductCatalogComp = () => {
        const dispatch = useDispatch();
        const products = useSelector((state) => state.product.products);
        const categories = useSelector((state) => state.category.categories);
        const cart = useSelector((state) => state.cart.cart);
        const [selectedCategory, setSelectedCategory] = useState('All'); // קטגוריה
        const [maxPrice, setMaxPrice] = useState(1000); // מחיר מקסימלי מהסליידר
        const [searchText, setSearchText] = useState(''); // חיפוש לפי טקסט
    
        

    function handleChange(e) {
        const value = Number(e.target.value);
        dispatch({ type: 'SET_QUANTITY', payload: value });
    }
  

  const increment = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const decrement = (product) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: product.id });
  };


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
    
              useEffect(() => {
                const q = query(collection(db, 'categories'));
              
                onSnapshot(q, (querySnapshot) => {
                  const categories = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                  }));
              
                  dispatch({ type: 'LOAD_CATEGORY', payload: categories });
                });
              }, []);

              const filterProducts = () => {
                return products.filter(product =>
                  (selectedCategory === 'All' || product.category === selectedCategory) &&
                  product.price <= maxPrice &&
                  product.title.toLowerCase().includes(searchText.toLowerCase())
                );
              };

              const clearFilters = () => {
                setSelectedCategory('All');
                setMaxPrice(1000);
                setSearchText('');
              };
return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}> 
    <Cart handleChange={handleChange}/>
    <Box sx={{ flexGrow: 1 }}>
    <Box
  sx={{
    maxWidth: 700,    
    maxHeight: 100,     
    overflow: 'auto',            
    padding: '4px',
    margin: 'auto',
    backgroundColor: '#ccc',}}>
   <Box
  sx={{
    padding: '6px 12px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: 1
  }}
>
<Stack direction="row" spacing={2} sx={{ overflow: 'auto'}}>
<Typography>
 Catergory:
</Typography>
<Select 
value={selectedCategory}
onChange={(e) => setSelectedCategory(e.target.value)}
sx={{ height: 25 }}>
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                  {category.name}
                  </MenuItem>
                 ))}
</Select>
<Typography>
Price: 
</Typography>
<Box sx={{ width: 200 }}>
  <Slider
    onChange={(e) => setMaxPrice(e.target.value)}
    size="small"
    defaultValue={70}
    aria-label="Price"
    valueLabelDisplay="auto"
  />
</Box>
<Typography >Price:</Typography>
    <TextField onChange={(e) => setSearchText(e.target.value)} InputProps={{sx: {height: 20, maxWidth:75, borderRadius: 25}}}>
    </TextField>
    <Button onClick={clearFilters} sx={{maxWidth: 10, height:20, color:'black', backgroundColor: "lightgrey"}}>Clear</Button>
</Stack>
    </Box>
    </Box>


    <Box   sx={{
    maxWidth: 700,    
    // marginLeft: 'auto',  
    // marginRight: 10, 
    margin: 'auto',              
    padding: '4px',
    backgroundColor: '#ccc',}}>
    {filterProducts().map((product) => {
          const cartItem = cart.find(item => item.id === product.id);
          const quantity = cartItem?.quantity || 0;
        return (
            <Card key={product.id}>
        <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
      
      {/* צד שמאל: טקסט וכפתורים */}
      <Stack spacing={1}>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>In stock: {product.quantity}</Typography>

        {/* כפתורי כמות */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button onClick={() => decrement(product)}>-</Button>
          <TextField
           type="number"
           value={quantity}
           onChange={(e) => dispatch({type: 'SET_QUANTITY',  payload: { id: product.id, quantity: Number(e.target.value) }})}
        InputProps={{
         sx: { height: 20, maxWidth: 75, borderRadius: 25 },
       inputProps: { min: 0 }}}
/>
          <Button onClick={() => increment(product)}>+</Button>
        </Stack>
      </Stack>

      {/* צד ימין: תמונה ו-Bought */}
      <Stack spacing={1} alignItems="center">
        <CardMedia
          component="img"
          src={product.pic}
          alt={product.title}
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
        >
        </CardMedia>
        <Typography>Bought 43</Typography>
      </Stack>

    </Stack>
        </CardContent>
    </Card>
        )
    })}
    </Box>
    </Box>
    </Box>
    </>
 );
}

export default ProductCatalogComp;
