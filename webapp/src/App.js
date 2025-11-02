import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses"); // ✅ token auto-attached
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="app-container">
                <h1>💼 Personal Expense Tracker</h1>
                <ExpenseList
                  expenses={expenses}
                  fetchExpenses={fetchExpenses}
                />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <div className="app-container">
                <h1>💼 Personal Expense Tracker</h1>
                <ExpenseForm fetchExpenses={fetchExpenses} />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
