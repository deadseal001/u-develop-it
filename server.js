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

// db.query(`SELECT* FROM candidates WHERE id =1`,(err, row)=>{
//     if (err){
//         console.log(err);
//     }
//     console.log(row)
// });

// db.query(`DELETE FROM candidates WHERE ID=?`,1,(err,result)=>{
//     if (err){
//         console.log(err);
//     }
//     console.log(result);
// });

//create a candidate

const sql=`insert into candidates (id, first_name, last_name, industry_connected)
            values (?,?,?,?)`;
const params = [1,'Ronald', 'Firbank', 1];

db.query(sql, params, (err,result)=>{
    if (err){
        console.log(err);
    }
    console.log(result);
});

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