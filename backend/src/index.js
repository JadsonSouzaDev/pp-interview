const express = require("express");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

const transcations = [];

app.get("/transactions", (req, res) => {
  res.json(transcations);
});

app.post("/transactions", (req, res) => {  
  const newTransaction = {
    amount: req.body.amount,
    description: req.body.description,
  };

  transcations.push(newTransaction);
  res.status(201).json(newTransaction);
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
})
