import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import {
  fetchPokemons,
  orderCards,
  reset,
  fetchFilteredPokemons,
  getTypes,
  setPage,
  setPageSize,
  // fetchEditedPokemons
} from "../../Redux/Actions";
import Nav from "../Nav/Nav";
import PaginationButtons from "../../Utils/Paginate";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortFilter, setSortFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [totalPages, setTotalPages] = useState(1);
  const totalPokemonsCount = useSelector((state) => state.totalPokemonsCount);

  useEffect(() => {
    dispatch(fetchPokemons(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    setTotalPages(Math.ceil(parseInt(totalPokemonsCount, 10) / pageSize));
    // console.log(totalPokemonsCount)
  }, [totalPokemonsCount, pageSize]);

  // console.log('PK After useEffect', pokemons)

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (event) => {
    const finalFilter = event.value;
    if (finalFilter === "reset" || finalFilter === "") {
      dispatch(reset());
      setSortFilter("reset");
    } else {
      dispatch(fetchFilteredPokemons(finalFilter, currentPage, pageSize));
      setSortFilter(finalFilter);
    }
    // console.log(pokemons);
  };

  const handleOrder = (option) => {
    const finalOrder = option.value;
    if (finalOrder === "reset" || finalOrder === "") {
      dispatch(reset());
      setSortOrder("reset");
    }
    dispatch(orderCards(finalOrder, currentPage, pageSize));
    setSortOrder(finalOrder);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortOptionsF = [
    { value: "reset", label: "All Types" },
    ...types.map((type) => ({ value: type, label: type })),
  ];

  const sortOptions = [
    { value: "reset", label: "Select Order" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  return (
    <div>
      <Nav
        sortOptions={sortOptions}
        sortOrder={sortOrder}
        handleOrder={handleOrder}
        sortOptionsF={sortOptionsF}
        sortFilter={sortFilter}
        handleFilter={handleFilter}
      />
      <div className="ContentContainer">
        {pokemons.length > 0 ? (
          <Cards pokemonData={pokemons} />
        ) : (
          <p>Loading...</p>
        )}
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
