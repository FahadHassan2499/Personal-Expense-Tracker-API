import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/expenses`);
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="app-container">
      <h1>💼 Personal Expense Tracker</h1>
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
    </div>
  );
}

export default App;
