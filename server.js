const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql=require('mysql2');

//Express middleware
app.use(express.urlencoded({extended: false}));//check function??
app.use(express.json());

//connect to database
const db=mysql.createConnection(
    {
        host:'localhost',
        user: "root",
        password:'658Leiothrix.',
        database:'election'
    },
    console.log('Connected to the election database')
);

db.query(`SELECT* FROM candidates`,(err, rows)=>{
    console.log(rows);
})



app.get('/',(req,res)=>{
    res.json({message: 'Hello Woirld'})
});

//Default response for any other reuqest(Not Found)
app.use((req,res)=>{
    res.status(404).end();
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});