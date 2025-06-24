const express = require("express");
const app = express();
const port = 3001;

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
