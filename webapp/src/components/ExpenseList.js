import React from 'react';
import axios from 'axios';
import API from "../services/api";
import { FaTrash } from 'react-icons/fa';

const ExpenseList = ({ expenses, fetchExpenses }) => {
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <p className="total">💰 Total: ₹{total}</p>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            <div>
              <strong>{exp.title}</strong> — ₹{exp.amount} <br />
              <small>{exp.category} | {exp.date} | {exp.description}</small>
            </div>
            <button onClick={() => deleteExpense(exp.id)}><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
