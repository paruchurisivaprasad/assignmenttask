const express=require('express');
const app=express();
const cors =require('cors');
const hospitalRoute=require('./routes/hospitals');


app.use(cors());

app.use(hospitalRoute);



app.listen(3000,()=>{
    console.log('app listening at 3000 port');
})

