"use client";

import { useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
}

const initialData: Item[] = [
  { id: 1, name: "Item 1", description: "Description for Item 1" },
  { id: 2, name: "Item 2", description: "Description for Item 2" },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialData);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Create
  const handleCreate = () => {
    const newItem: Item = { id: items.length + 1, ...formData };
    setItems([...items, newItem]);
    setFormData({ name: "", description: "" });
  };

  // Update
  const handleUpdate = (id: number, updatedData: Item) => {
    setItems(items.map((item) => (item.id === id ? updatedData : item)));
  };

  // Delete
  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Simple CRUD App</h1>

      {/* Form to Create Item */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Item</h2>
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Item Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Add Item
        </button>
      </div>

      {/* Item List (Read and Delete) */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-semibold mb-4">Item List</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                onClick={() =>
                  handleUpdate(item.id, {
                    id: item.id,
                    name: prompt("New name:", item.name) || item.name,
                    description:
                      prompt("New description:", item.description) ||
                      item.description,
                  })
                }
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
