const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Backend API
app.get('/api', (req,res)=> res.json({message:"S.D.R PREMIUM LIBRARY API LIVE 🚀", status:"LIVE"}));
app.get('/', (req,res)=> res.sendFile(path.join(__dirname,'index.html')));

let students = [];
let seats = {};

app.get('/students', (req,res)=> res.json(students));
app.post('/students', (req,res)=>{ students.push(req.body); res.json({ok:true}); });
app.get('/seats', (req,res)=> res.json(seats));
app.post('/seats', (req,res)=>{ seats=req.body; res.json({ok:true}); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('LIVE on '+PORT));
