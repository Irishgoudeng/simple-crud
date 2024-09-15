"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  name: string;
  description: string;
}

const EditItemPage = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${params.id}`);
        console.log("Fetch response:", response);

        if (!response.ok) {
          throw new Error(`Error fetching item: ${response.statusText}`);
        }

        const text = await response.text();
        console.log("Response text:", text);

        if (text) {
          const data: Item = JSON.parse(text);
          setItem(data);
          setName(data.name);
          setDescription(data.description);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
        // Handle error or display a message
      }
    };

    fetchItem();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item) {
      try {
        const response = await fetch(`/api/items/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        });

        if (response.ok) {
          router.push("/items");
        } else {
          console.error("Failed to update item:", response.statusText);
          // Handle error or display a message
        }
      } catch (error) {
        console.error("Error during submission:", error);
        // Handle error or display a message
      }
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;
