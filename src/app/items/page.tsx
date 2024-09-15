"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  id: number;
  name: string;
  description: string;
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const data: Item[] = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Items</h1>
      <div className="mb-4">
        <Link
          href="/items/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Item
        </Link>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/items/${item.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
