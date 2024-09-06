"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, remove } from "./Redux/todoSlice";
import TodoList from "./TodoList";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

// Typing for Todo
interface Todo {
  id: number;
  name: string;
  email: string;
  roll: string;
  number: string;
}

// Typing for the RootState of the Redux store
interface RootState {
  name: {
    todo: Todo[];
  };
}

const FormFlied = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roll, setRoll] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const dispatch = useDispatch();

  // Type the useSelector correctly
  const selector = useSelector((state: RootState) => state.name.todo);

  const allData: Todo = {
    id: Date.now(),
    name,
    email,
    roll,
    number,
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(allData)); 
    toast.success("Todo added successfully");
    setName("");
    setEmail("");
    setRoll("");
    setNumber("");
  };

  // Button is disabled if any field is empty
  const isDisabled = !name || !email || !roll || !number;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="flex w-full max-w-5xl space-x-6">
        {/* Left Side Form */}
        <div className="w-1/3 bg-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Fill the Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="roll" className="block text-sm font-medium mb-1">
                Roll
              </label>
              <input
                type="text"
                name="roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="number" className="block text-sm font-medium mb-1">
                Number
              </label>
              <input
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isDisabled}
                className={`mb-2 text-white font-bold py-2 px-4 rounded w-full ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
              >
                Submit Your Todo
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Table */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Entered Details</h2>
          <div className="flex block justify-between p-2">
            <h1 className="text-xl font-bold text-black">Name</h1>
            <h1 className="text-xl font-bold text-black">Email</h1>
            <h1 className="text-xl font-bold text-black">Number</h1>
            <h1 className="text-xl font-bold text-black">Roll</h1>
            <h1 className="text-xl font-bold text-black">Action</h1>
          </div>
          <div>
            {selector.length > 0 ? (
              <>
                {selector.map((item, index) => (
                  <TodoList key={index} item={item} />
                ))}
                <h1
                  onClick={() => {
                    dispatch(remove());
                    toast.success("All todos deleted successfully");
                  }}
                  className="text-2xl font-bold hover:text-red-600 duration-500 text-center mt-7 border-2 border-green-500 bg-transparent hover:bg-green-500 text-amber-500 rounded-md p-1"
                >
                  All Delete
                </h1>
              </>
            ) : (
              <div className="py-10">
                <i>
                  <h1 className="text-center text-4xl font-bold text-red-500">
                    Todo Not Here
                  </h1>
                  <p className="text-red-500 font-semibold text-xl text-center mt-4">
                    Please Add Your Todo
                  </p>
                </i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFlied;
