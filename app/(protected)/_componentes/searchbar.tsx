"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {

  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setQuery(term)
    onSearch(term)
  }

  return (
    <div className="relative flex items-center select-none">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar usuarios..."
        className="w-[300px] px-8 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute left-3 h-[18px] text-gray-400 pointer-events-none" />
    </div>
  );
}
