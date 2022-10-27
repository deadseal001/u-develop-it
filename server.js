const { spreadProperty } = require('@babel/types');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db=require('./db/connection');
const inputCheck=require('./utils/inputCheck');
const apiRoutes=require('./routes/apiRoutes');





//Express middleware
app.use(express.urlencoded({extended: false}));//check function??
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);

//Default response for any other reuqest(Not Found)
app.use((req,res)=>{
    res.status(404).end();
});

//start server after DB connection
db.connect(err=>{
    if(err) throw err;
    console.log('Database connected.');
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
});

