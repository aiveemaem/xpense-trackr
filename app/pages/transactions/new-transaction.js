"use client";

import { useState } from "react";

export default function NewTransaction({
  onAddTransaction,
  onCloseTransaction,
}) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const categories = [
    "Groceries",
    "Dining Out",
    "Utilities",
    "Rent",
    "Transportation",
    "Health",
    "Entertainment",
    "Education",
    "Miscellaneous",
    "Travel",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Math.floor(Math.random() * 10000);
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    const newTransaction = {
      id: newId,
      date: adjustedDate,
      description,
      category,
      amount: parseFloat(amount).toFixed(2),
    };

    onAddTransaction(newTransaction);

    setDate("");
    setDescription("");
    setCategory("");
    setAmount(0);

    onCloseTransaction();
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    // <main>
    <div
      className=" absolute w-full h-full backdrop-filter backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50  "
      onClick={onCloseTransaction}
    >
      <div
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-xl"
        onClick={(e) => {
          e.stopPropagation(); // prevent click from bubbling up to parent div
        }}
      >
        <h1 className="text-2xl text-gray-800 font-bold mb-8">
          Add New Expense
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-800">Date:</span>
            <input
              type="date"
              required
              onChange={handleDateChange}
              value={date}
              className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
            />
          </label>

          <label className="block mb-4 ">
            <span className="text-gray-800">Category:</span>
            <select
              required
              onChange={handleCategoryChange}
              value={category}
              className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-800">Description:</span>
            <textarea
              required
              onChange={handleDescriptionChange}
              value={description}
              className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
              rows="3"
            />

            <label className="block mb-4">
              <span className="text-gray-800">Amount:</span>
              <input
                required
                type="number"
                min="0.00"
                onChange={handleAmountChange}
                value={amount}
                className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
              />
            </label>
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md text-white"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
    // </main>
  );
}
