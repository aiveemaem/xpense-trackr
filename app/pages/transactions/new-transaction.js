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
    // const newId = Math.floor(Math.random() * 10000);
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    const newTransaction = {
      // id,
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
      className=" absolute top-0 left-0 h-screen w-screen backdrop-filter backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCloseTransaction}
    >
      <div
        className="w-full max-w-xl bg-base-100 p-8 rounded-lg shadow-xl"
        onClick={(e) => {
          e.stopPropagation(); // prevent click from bubbling up to parent div
        }}
      >
        <h1 className="text-2xl font-bold mb-8">Add New Expense</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="text-base-content">Date:</span>
            </div>
            <input
              type="date"
              required
              onChange={handleDateChange}
              value={date}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="text-base-content">Category:</span>
            </div>
            <select
              required
              onChange={handleCategoryChange}
              value={category}
              className="select select-bordered"
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="text-base-content">Description:</span>
            </div>

            <textarea
              required
              onChange={handleDescriptionChange}
              value={description}
              className="textarea textarea-bordered h-24"
              rows="3"
            />

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base-content">Amount:</span>
              </div>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                onChange={handleAmountChange}
                value={amount}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </label>

          <button type="submit" className="w-full btn mt-4">
            Add Expense
          </button>
        </form>
      </div>
    </div>
    // </main>
  );
}
