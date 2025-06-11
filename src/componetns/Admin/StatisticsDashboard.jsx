import { PieChart } from '@mui/x-charts/PieChart';
import { useState ,useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import { useDispatch , useSelector } from 'react-redux';
import { Box, Typography, Select, MenuItem, Divider } from '@mui/material';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { BarChart } from '@mui/x-charts/BarChart';


const StatisticsDashboardComp = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [userChartData, setUserChartData] = useState({
      labels: [],
      values: [],
    });
      const dispatch = useDispatch();
      const users = useSelector((state) => state.user.users);
      const products = useSelector((state) => state.product.products);
      const pieData = products.map((product) =>{
        const userData = product.boughtBy.reduce((sum, user) =>{
          return sum + user.quantity;
        }, 0)
        return {
          id: product.id,
          label: product.title,
          value: userData
        }
      })

      useEffect(() => {
        if (!selectedUser) return;
      
        const labels = [];
        const values = [];
      
        products.map((product) => {
          const userOrders = (product.boughtBy || []).filter(
            (entry) => entry.name.toLowerCase() === selectedUser.toLowerCase()
          );
      
          if (userOrders.length > 0) {
            const totalQuantity = userOrders.reduce((sum, entry) => sum + entry.quantity, 0);
            labels.push(product.title);
            values.push(totalQuantity);
          }
        });

        const sorted = labels.map((label, i) => ({
          label,
          value: values[i]
        })).sort((a, b) => a.value - b.value);
        
        const sortedLabels = sorted.map(item => item.label);
        const sortedValues = sorted.map(item => item.value);
      
        setUserChartData({ labels: sortedLabels, values: sortedValues });
      }, [selectedUser, products]);
      
      
      
      
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
    <Box sx={{padding: 2, margin: 'auto' ,backgroundColor:'lightgrey', maxWidth: 500,}}>
    <Typography sx={{textAlign: 'center', margin: 'auto'}}>Total Sold Products</Typography>
    <Box sx={{ border:"1px solid white", maxWidth: 400, margin: 'auto' }}>
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={200}
      height={200}
    />
    </Box>
    </Box>
    <Divider/>
    <Box sx={{padding: 2, margin: 'auto' ,backgroundColor:'lightgrey', maxWidth: 500,}}>
      <Select 
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
      displayEmpty
      sx={{ height: 25 }}>
         <MenuItem value="">
          Select User
          </MenuItem>
      {users.map((user) => (
          <MenuItem key={user.id} value={`${user.firstName} ${user.lastName}`}>
            {user.firstName} {user.lastName}
          </MenuItem>
      ))}
      </Select>

       <BarChart
         series={[{
         type: 'bar',
         data: userChartData.values,
          label: 'Qty',
         valueFormatter: (v, i) => `${v} ${userChartData.labels[i]}`,
        }]}
       xAxis={[{
       data: userChartData.labels,
         scaleType: 'band',
          }]}
       width={500}
       height={300} />
    </Box>
    </>
 );
}

export default StatisticsDashboardComp;
