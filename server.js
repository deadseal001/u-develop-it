const { spreadProperty } = require('@babel/types');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql=require('mysql2');
const inputCheck=require('./utils/inputCheck');


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

//get all candidates
app.get('/api/candidates',(req,res)=>{
    const sql = `SELECT candidates.*, parties.name AS party_name 
                FROM candidates 
                LEFT JOIN parties ON candidates.party_id = parties.id`;
    db.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        } 
        res.json({
            message: 'success',
            data:rows
        });
    });
})

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name 
             FROM candidates 
             LEFT JOIN parties ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//Delete a candidate
app.delete('/api/candidate/:id',(req,res)=>{
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params= [req.params.id];
    console.log(sql, params);
    db.query(sql, params, (err,result)=>{
        if (err) {
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows){
            res.json({message: 'Candidate not found'});
        } else {
            res.json({
                Message: 'deleted',
                changes: result.affectedRows,
                id: req.params,id
            });
        }
    });
})


// create a candidate
app.post('/api/candidate',({body},res)=>{
    const errors= inputCheck(body,'first_name','last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({error:errors});
        return;
    }
    const sql=`insert into candidates (first_name, last_name, industry_connected)
    values(?,?,?)`;
    const params=[body.first_name, body.last_name, body.industry_connected];

    db.query(sql,params,(err,result)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data:body
        });
    });
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