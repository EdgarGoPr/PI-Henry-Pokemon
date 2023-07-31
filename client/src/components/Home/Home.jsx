import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { fetchPokemons, reset, getTypes } from "../../Redux/Actions";
import Nav from "../Nav/Nav";
import PaginationButtons from "../../Utils/Paginate";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const pageSize = useSelector((state) => state.pageSize);
  const totalPokemonsCount = useSelector((state) => state.totalPokemonsCount);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortFilter, setSortFilter] = useState(null);
  const [filterSource, setFilterSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(
      fetchPokemons(currentPage, pageSize, sortOrder, sortFilter, filterSource)
    );
  }, [dispatch, currentPage, pageSize, sortOrder, sortFilter, filterSource]);

  useEffect(() => {
    setTotalPages(Math.ceil(parseInt(totalPokemonsCount, 10) / pageSize));
  }, [totalPokemonsCount, pageSize]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (event) => {
    const finalFilter = event.value;
    if (finalFilter === "reset" || finalFilter === "") {
      dispatch(reset());
      setSortFilter("reset");
    } else {
      const pageOne = 1;
      dispatch(
        fetchPokemons(pageOne, pageSize, sortOrder, finalFilter, filterSource)
      );
      setCurrentPage(pageOne);
      setSortFilter(finalFilter);
    }
  };

  const handleFilterSource = (event) => {
    const finalFilter = event.value;
    if (finalFilter === "reset" || finalFilter === "") {
      dispatch(reset());
      setFilterSource("reset");
    } else {
      const pageOne = 1;
      dispatch(
        fetchPokemons(pageOne, pageSize, sortOrder, sortFilter, finalFilter)
      );
      setCurrentPage(pageOne);
      setFilterSource(finalFilter);
    }
  };

  const handleOrder = (option) => {
    const finalOrder = option.value;
    if (finalOrder === "reset" || finalOrder === "") {
      dispatch(reset());
      setSortOrder("reset");
    }
    dispatch(
      fetchPokemons(currentPage, pageSize, finalOrder, sortFilter, filterSource)
    );
    setSortOrder(finalOrder);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortOptionsF = [
    { value: "reset", label: "Select Type" },
    ...types.map((type) => ({ value: type, label: type })),
  ];

  const sortOptions = [
    { value: "reset", label: "Select Order" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
    { value: "max", label: "Max Attack" },
    { value: "min", label: "Min Attack" },
  ];

  const sourceOptions = [
    { value: "reset", label: "Select Source" },
    { value: "DB", label: "Data Base" },
    { value: "API", label: "Api" },
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
        sourceOptions={sourceOptions}
        handleFilterSource={handleFilterSource}
        totalPages={totalPages}
      />
      <div className="ContentContainer">
        {pokemons.length > 0 ? (
          <Cards pokemonData={pokemons} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
