const express = require('express');
const fs = require('fs');
const app = express()
app.get(/\.html$/,(req,res)=>{
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})
app.get(/\.js$/,(req,res)=>{
    console.log(req.url);
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})
app.get(/\.css$/,(req,res)=>{
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})
app.get(/\.jpg$/,(req,res)=>{
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})
app.get(/\.webp$/,(req,res)=>{
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})
app.get(/\.png$/,(req,res)=>{
    let data = fs.readFileSync('.'+req.url)
    res.end(data);
})

app.listen(12345,()=>{
    console.log('server started');
})