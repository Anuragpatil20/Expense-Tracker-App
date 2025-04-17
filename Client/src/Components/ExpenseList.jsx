import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function ExpenseList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => {
        setUsers(result.data);
        setFilteredUsers(result.data);
        const uniqueCategories = ['All', ...new Set(result.data.map(item => item.category))];
        setCategories(uniqueCategories); 
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/deleteuser"+id)
      .then(res => {
        console.log(res);
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
        applyFilter(selectedCategory, updatedUsers);
        
        // Show a success toast after deletion
        toast.success('Expense deleted successfully!', {
        
        });
      })
      .catch(err => console.log(err));
  };

  const applyFilter = (category, userList = users) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredUsers(userList);
    } else {
      setFilteredUsers(userList.filter(user => user.category === category));
    }
  };

  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`card-${id}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 5;
    const rotateY = (x - centerX) / 5;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.transition = 'transform 0.1s ease, background-color 0.3s ease';
    card.style.backgroundColor = '#e0e7ff'; // Light Indigo
  };

  const handleMouseLeave = (id) => {
    const card = document.getElementById(`card-${id}`);
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Original translucent white
    card.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-indigo-200 via-blue-100 to-white">
      <div className="mb-6">
        <label className="mr-3 font-semibold text-lg text-gray-700">Filter by Category:</label>
        <select
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCategory}
          onChange={(e) => applyFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            id={`card-${user._id}`}
            className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-gray-200 transition-all duration-300 ease-in-out"
            onMouseMove={(e) => handleMouseMove(e, user._id)}
            onMouseLeave={() => handleMouseLeave(user._id)}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              cursor: 'pointer'
            }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{user.title}</h2>
            <p className="text-gray-700">💰 Amount: ₹{user.amount}</p>
            <p className="text-gray-700">📂 Category: {user.category}</p>
            <p className="text-gray-700">📅 Date: {new Date(user.expenseDate).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(user._id)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add ToastContainer component for displaying the toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default ExpenseList;
