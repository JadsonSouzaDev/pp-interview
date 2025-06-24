import { useEffect, useState } from 'react'
import './App.css'

interface Transaction {
  amount: number;
  description: string;
}

function App() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions();
  }, [])

  const getTransactions = async () => {
    const response = await fetch('http://localhost:3001/transactions');
    if (response.ok){
      const transactions = await response.json();
      setTransactions(transactions);
    }
  }

  const handleSubmit = async () => {
    const transactionData = { amount, description };
    
    const response = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    })

    if(response.ok){      
      const transaction = await response.json();
      const newTransactions = [...transactions, transaction];
      setTransactions(newTransactions);
      setAmount(0);
      setDescription('');
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  }

  return (
    <div className='container'>
      <form >
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input name='amount' type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
        </div>
         <div className="field">
          <label htmlFor="description">Description</label>
          <input name='description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type='button' className='register_button' onClick={handleSubmit}>Register</button>
      </form>

      <div className="list">
        {transactions.map((t, index) => {
          return <div key={index}>
            <span>{t.description}</span>
            <span>{t.amount}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
