import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt=10;

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db=mysql.createConnection(
    {
        host:"localhost",
        user:"your username",
        password:"your password",
        database:'your database name'
    }
)

app.post('/register',(req,res)=>
{
    const sql="INSERT INTO login (`companyName`, `licenseNumber`, `email`, `password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error: "Error for hashing Password"})
            const values=[
                req.body.companyName,
                req.body.licenseNumber,
                req.body.email,
                hash
            ]
            db.query(sql,[values],(err,result)=>
            {
                if(err) return res.json({Error:err})
                return res.json({Status:"Success"});
            })
    })
   
});

app.post('/login',(req,result)=>
{
 const sql='SELECT * FROM login WHERE email = ?';
 const data=db.query(sql,[req.body.email],(err,data)=>
 {
    if(err)
    {
        return result.json({Error:'Error in inserting' });
    }
    if(data.length>0)
    {
        bcrypt.compare(req.body.password.toString(),data[0].password,(err,isMatch)=>{
            if(err){
                return result.json({Error:'Error in password compare' });


            }
            
            if(isMatch){
                return result.json({Status:'Success'});

            }
            else {
                return result.json({ Error: "Invalid password" });
            }
        })

    }
    else{
        return result.json({Error:'Error in inserting' });
    }
 }
)
});


app.listen(8081,()=>
{
    console.log("Running server...");
})