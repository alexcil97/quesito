"use client";
import SearchBar from "../_componentes/searchbar";
import Table from "../_componentes/table";
import { useSearchParams } from "next/navigation";
import TableFriends from "../_componentes/tableFriends";
import { useFriends } from "../hook/use-Friends-user";

const SearchPage = () => {

  const searchParams = useSearchParams()
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const { friends, loading, error } = useFriends();

  return (
    <>
      <h2>Busacador...</h2>
      <div className="flex flex-col space-y-4">
        <SearchBar />
        <Table query={query} currentPage={currentPage} />
        {friends.map((id) => (
          <TableFriends key={id} id={id} />
        ))}
      </div>
    </>
  );
}

export default SearchPage
