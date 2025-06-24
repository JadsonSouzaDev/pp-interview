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
      <form>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input 
            name='amount' 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="Enter transaction amount"
          />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input 
            name='description' 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction description"
          />
        </div>
        <button type='button' className='register_button' onClick={handleSubmit}>
          Register Transaction
        </button>
      </form>

      <div className="list">
        <h2>Transaction History</h2>
        
        {transactions.length === 0 ? (
          <div className="empty-state">
            <h3>No transactions found</h3>
            <p>Add your first transaction using the form above</p>
          </div>
        ) : (
          transactions.map((t, index) => (
            <div key={index} className="transaction-item">
              <span className="transaction-description">{t.description}</span>
              <span className={`transaction-amount ${t.amount >= 0 ? 'positive' : 'negative'}`}>
                {t.amount >= 0 ? '+' : ''}R$ {t.amount.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
