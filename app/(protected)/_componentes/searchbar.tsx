"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = useDebouncedCallback((terms) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms) {
      params.set("query", terms);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 bg-white">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full text-black"
        placeholder="Busca amigos"
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          handleSearch(e.target.value);
        }}
        value={searchTerm}
      />
    </div>
  );
}
