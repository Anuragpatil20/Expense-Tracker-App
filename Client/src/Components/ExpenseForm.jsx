import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenseDate, setExpenseDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", {
        title,
        amount,
        category,
        expenseDate,
      })
      .then((result) => {
        console.log(result);

        // Show success notification after successful submission
        toast.success('Expense added successfully!', {
          position: 'top-right', // Use the string directly
          autoClose: 5000, // Optional: Customize the auto close time
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Optionally clear the form inputs after submission
        setTitle('');
        setAmount('');
        setCategory('Food');
        setExpenseDate('');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error adding expense!', {
          position: 'bottom-right', // Use the string directly
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl border border-gray-200 max-w-3xl mx-auto mt-10 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 tracking-tight">
        ➕ Add New Expense
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="e.g. 250"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Category
          </label>
          <select
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Date
          </label>
          <input
            type="date"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300"
      >
        💾 Add Expense
      </button>
      
      {/* ToastContainer to render the notifications */}
      <ToastContainer />
    </form>
  );
};

export default ExpenseForm;
