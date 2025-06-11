import { Box, Typography, Paper, Button, TextField, Card, CardContent } from '@mui/material';
import { useState ,useEffect } from 'react';
import { collection, query, onSnapshot, addDoc , deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch , useSelector } from 'react-redux';

const CategoryManagerComp = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [newCategory, setNewCategory] = useState({
        name : '',
        status : 'NEW',
    });
    const [newName, setNewName] = useState({
        name : '',
        status : 'NEW',
    });
    const [editingId, setEditingId] = useState(null);

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
      const newData = async () => {
         await addDoc(collection(db, 'categories'), newCategory);
      }
      const removeData = async (id) => {
        await deleteDoc(doc(db, 'categories', id));
        dispatch({ type: 'REMOVE_CATEGORY', payload: { id } });
      }

      const updateData = async (id) => {
        await updateDoc(doc(db, 'categories', id), { name: newName.name });
        setEditingId(null);
      }
      
return (
    <>
 <Box sx={{  pt:2, mt:1,  maxWidth: 600, margin: 'auto', padding: 3, backgroundColor: '#b2b2b2', borderRadius: 2, }}>
  <Typography sx={{ mt:1, }} variant="h4" fontWeight="bold">Categories</Typography>

  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
  
    {categories.map((category) => {
        return (
        <Card key={category.id} variant="outlined" component={Paper} sx={{ maxWidth: 250, mb: 2 }}  >  
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography>{category.name}</Typography>
            <Button   onClick={() => {
                 setEditingId(editingId === category.id ? null : category.id);
                 setNewName({ name: category.name }); 
                 }}    
            size="small" 
            sx={{ backgroundColor: 'lightgrey', color: 'black'}}
            
            >Update</Button>
            <Button onClick ={() => removeData(category.id)} size="small" sx={{ backgroundColor: 'lightgrey', color: 'black'}}>Remove</Button>
            </Box>

            {editingId === category.id && (
                <Box sx={{ mt: 1 }}>
                 <TextField placeholder='New Name' 
                 InputProps={{
                    sx: {
                        height: 40,
                    }
                 }}
                 onChange={(e) => setNewName({ name: e.target.value })}
                 />
                 <Button onClick={() =>updateData(category.id)} size="small" sx={{ backgroundColor: 'lightgrey', color: 'black'}}>Save</Button>
                </Box>
            )}
          </CardContent>          
        </Card>
        );
    })}
   <TextField onChange= {(e) => setNewCategory({...newCategory, name: e.target.value})}
  placeholder="Add new category"
  sx={{ maxWidth: 250 }}
  InputProps={{
    sx: {
      height: 40,
      '& input': {
        padding: '10px 14px',
      }
    }
  }}
/>
<Button onClick={newData} size="small" sx={{ backgroundColor: 'limegreen', color: 'black'}}>Add New</Button>
  </Box>
</Box>
    </>
 );
}

export default CategoryManagerComp;
