const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

//Adding routers 
const studentRoutes = require('./routes/studentRoutes.js');
app.use('/students',studentRoutes);

app.get('/',(req,res) => {
    res.send('Student Management API is running');
});

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
});