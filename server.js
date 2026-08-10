
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Sample Data
let currentAffairs = [
  {id:1, date: new Date().toISOString().split('T')[0], question: "G20 Summit 2026 kaha hua?", answer: "USA", category: "International", explanation: "2026 G20 USA me"},
  {id:2, date: new Date().toISOString().split('T')[0], question: "Chandrayaan-4 kab launch hua?", answer: "2026", category: "Science", explanation: "ISRO dwara"}
];
let gk = [
  {id:1, question: "UP ki Rajdhani?", answer: "Lucknow", category: "State GK"},
  {id:2, question: "Bharat ka Rashtriya Pashu?", answer: "Bagh", category: "National"}
];
let gs = [
  {id:1, subject: "History", question: "1857 kranti kaha se?", answer: "Meerut"},
  {id:2, subject: "Geography", question: "Ganga ka udgam?", answer: "Gangotri"}
];
let attendance = [];

app.get('/', (req,res) => {
  res.json({ message: 'S.D.R PREMIUM LIBRARY API LIVE 🚀', address: 'Muhammadpur Hasanpur Ghoshi Road 276306', endpoints: ['/api/current-affairs','/api/gk','/api/gs','/api/attendance/today'], status: 'LIVE', lastUpdated: new Date().toISOString() });
});

app.get('/api/current-affairs', (req,res) => res.json({success:true, count: currentAffairs.length, lastUpdated: new Date().toISOString(), data: currentAffairs}));
app.get('/api/current-affairs/quiz', (req,res) => {
  const quiz = [...currentAffairs].sort(()=>0.5-Math.random()).slice(0,5).map(q=>({question:q.question, options:[q.answer,'Option B','Option C','Option D'], answer:q.answer, explanation:q.explanation}));
  res.json({success:true, quiz});
});
app.get('/api/gk', (req,res) => res.json({success:true, data: gk}));
app.get('/api/gs', (req,res) => res.json({success:true, data: gs}));

app.post('/api/attendance/punch', (req,res) => {
  const {studentName, seatNo, type} = req.body;
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  let record = attendance.find(a => a.studentName === studentName && a.date === today && !a.punchOut);
  if(type === 'IN'){
    if(record) return res.status(400).json({success:false, message:'Already IN'});
    const r = {id: Date.now(), studentName, seatNo, date: today, punchIn: now.toISOString(), punchOut: null, hours: null};
    attendance.push(r);
    return res.json({success:true, data:r});
  } else {
    if(!record) return res.status(400).json({success:false, message:'IN not found'});
    record.punchOut = now.toISOString();
    record.hours = ((new Date(record.punchOut) - new Date(record.punchIn))/3600000).toFixed(2);
    return res.json({success:true, data:record});
  }
});
app.get('/api/attendance/today', (req,res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json({success:true, date: today, data: attendance.filter(a=>a.date===today)});
});
app.get('/api/attendance/all', (req,res) => res.json({success:true, data: attendance}));

app.listen(PORT, () => console.log(`SDR LIVE on ${PORT}`));
