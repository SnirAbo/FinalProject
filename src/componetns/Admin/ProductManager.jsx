import { Box, Typography, Paper, Button, TextField , Card, CardContent , Select, MenuItem } from '@mui/material';
import {Table , TableBody , TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState ,useEffect } from 'react';
import { collection, query, onSnapshot, addDoc , deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch , useSelector } from 'react-redux';

const ProductManagerComp = () => {
    const dispatch = useDispatch();
        const products = useSelector((state) => state.product.products);
        const categories = useSelector((state) => state.category.categories);
        const [newProduct, setNewProduct] = useState({
            title : '',
            quantity: 0,
            category: '',
            description: '',
            price: 0,
            pic: '',
            boughtBy: [],
        });


        const [updatedProducts, setUpdatedProducts] = useState({});

        const getValidCategory = (id) => {
          const cat = updatedProducts[id]?.category ?? products.find(p => p.id === id)?.category;
          return categories.some(c => c.name === cat) ? cat : '';
        };

        const addNew = (e) => {
          setNewProduct((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,  // Dynamically update the corresponding field in formData
          }));
        };


        const handleProductChange = (id, field, value) => {
          setUpdatedProducts((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              [field]: value,
            },
          }));
        };
      
        const handleSave = async (id) => {
          const updated = updatedProducts[id];
          if (updated) {
            await updateDoc(doc(db, 'products', id), updated);
            alert('Product updated!');
          }
        };


    const handleSubmit =  async (e) => {
    e.preventDefault();  

    const requiredFields = ['title', 'category', 'description', 'price'];
    if (requiredFields.some(field => !newProduct[field])) {
      alert("Please fill all required fields");
      return;
    }
    await addDoc(collection(db, 'products'), newProduct); // Add the new product to the Firestore database
    alert(`Product Added: ${newProduct.title}`); 
    console.log(newProduct);  // Log the form data to the console
   };


        // const [editingId, setEditingId] = useState(null);
        const [isClicked, setIsClicked] = useState(false);
        // const [menuCategory, setMenuCategory] = useState('');
    
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
          
return (
    <>
 <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 , maxWidth: 600, margin: 'auto', padding: 3,}}>
    {products.map((product) => {
        return (
        <Card key={product.id} variant="outlined" component={Paper} sx={{ maxWidth: 600,maxHeight: 600, mb: 2 }}  >  
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row' ,alignItems: 'center',  gap: 1 }}>
              {/*  */}
             <Typography >Title:</Typography>
            <TextField InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} value={updatedProducts[product.id]?.title ?? product.title}
                 onChange={(e) => handleProductChange(product.id, 'title', e.target.value)}
                 >
                 </TextField>
                 {/*  */}
             <Typography >Quantity:</Typography>
            <TextField InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} value={updatedProducts[product.id]?.quantity ?? product.quantity}
                 onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                 >
                 </TextField>

            </Box>
            {/*  */}
            <Box sx={{ display: 'flex', alignItems: 'center',  gap: 1 }}>
             <Typography >Price:</Typography>
            <TextField InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} value={updatedProducts[product.id]?.price ?? product.price}
                 onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                 ></TextField>

            </Box>
            {/*  */}
            <Box>
            <Typography >Category:</Typography>
            <Select  value={getValidCategory(product.id)} 
                  onChange={(e) => handleProductChange(product.id, 'category', e.target.value)} sx={{ height: 40 }}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                  {category.name}
                  </MenuItem>
                 ))}
            </Select>
            </Box>
            {/*  */}
            <Box>
                 <Typography>Description :</Typography>
                 <TextField InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} value={updatedProducts[product.id]?.description ?? product.description}
                 onChange={(e) => handleProductChange(product.id, 'description', e.target.value)}
                 ></TextField>
            </Box>
            {/*  */}
            <Box>
                 <Typography>Picture :</Typography>
                 <TextField InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} value={updatedProducts[product.id]?.pic ?? product.pic}
                 onChange={(e) => handleProductChange(product.id, 'pic', e.target.value)}
                 ></TextField>
            </Box>

<TableContainer sx={{ maxWidth:450 }} component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">qty</TableCell>
            <TableCell align="right">date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.boughtBy.map((user, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.quantity}</TableCell>
              <TableCell align="right">{new Date(user.date.seconds * 1000).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button   
            size="small" 
            sx={{ backgroundColor: 'limegreen', color: 'black'}}
            onClick={() => handleSave(product.id)}
            >Save</Button>
          </CardContent>          
        </Card>
        );
    })}
      <Button onClick={(e) => setIsClicked(!isClicked)} size="small" sx={{ backgroundColor: 'limegreen', color: 'black'}}>Add New</Button>
      {isClicked && (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' ,alignItems: 'center',  gap: 1 }}>
             <Typography >Title:</Typography>
            <TextField 
            name="title"
            InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} onChange={addNew}></TextField>
            </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' ,alignItems: 'center',  gap: 1 }}>
             <Typography >Quantity: </Typography>
            <TextField 
            name="quantity"
            InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} onChange={addNew}></TextField>
            </Box>
            <Box>
            <Typography >Category:</Typography>
            <Select name="category" value={newProduct.category} onChange={addNew} sx={{ height: 40 }}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                  {category.name}
                  </MenuItem>
                 ))}
            </Select >
            </Box>
            <Box>
                 <Typography>Description :</Typography>
                 <TextField 
                 name="description"
                 InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} onChange={addNew}></TextField>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center',  gap: 1 }}>
             <Typography >Price:</Typography>
            <TextField name="price" type='number' InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} onChange={addNew}></TextField>
            </Box>
            <Box>
                 <Typography>Picture :</Typography>
                 <TextField 
                 name="pic"
                 InputProps={{
                    sx: {
                        height: 40,
                    }
                 }} onChange={addNew}></TextField>
            </Box>
        <Button  size="small" 
            sx={{ backgroundColor: 'limegreen', color: 'black'}} onClick={handleSubmit}> Save</Button>
      </Box>
       )}
  </Box>
    </>
 );
}

export default ProductManagerComp;
