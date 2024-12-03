"use client";
import SearchBar from "../_componentes/searchbar";
import Table from "../_componentes/table";
import { useSearchParams } from "next/navigation";
import TableFriends from "../_componentes/tableFriends";
import { useFriends } from "../hook/use-Friends-user";
import { useState } from "react";

const SearchPage = () => {

  const [query, setQuery] = useState("")
  const handleSearch = (term: string) => {
    setQuery(term)
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <SearchBar onSearch={handleSearch} />
        <Table query={query}/>
        {/* <TableFriends /> */}
      </div>
    </>
  );
}

export default SearchPage
