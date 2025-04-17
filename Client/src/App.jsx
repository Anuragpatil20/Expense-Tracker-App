import React, { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-indigo-100">
        {/* Modern Navbar */}
        <nav className="backdrop-blur-lg bg-white/70 shadow-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
              💸 Expense Tracker
            </h1>
            <div className="space-x-6 hidden sm:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition font-medium ${
                    isActive
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Add Expense
              </NavLink>
              <NavLink
                to="/list"
                className={({ isActive }) =>
                  `transition font-medium ${
                    isActive
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Expense List
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<ExpenseForm onAdd={handleAddExpense} />} />
            <Route path="/list" element={<ExpenseList expenses={expenses} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
