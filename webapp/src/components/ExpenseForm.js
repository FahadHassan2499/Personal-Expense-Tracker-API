import React, { useState } from 'react';
import API from "../services/api";
import axios from 'axios';

const ExpenseForm = ({ fetchExpenses }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/expenses`, formData);
      fetchExpenses();
      setFormData({ title: '', description: '', category: '', amount: '', date: '' });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
