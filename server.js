const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(__dirname));

// Student App
app.get('/', (req,res)=> res.sendFile(path.join(__dirname,'SDR-APP-FINAL-PWA.html')));

// Admin Panel - 32 seats 12 months
app.get('/admin', (req,res)=> res.sendFile(path.join(__dirname,'admin.html')));

app.listen(PORT, ()=> console.log('SDR Library Live on '+PORT));
