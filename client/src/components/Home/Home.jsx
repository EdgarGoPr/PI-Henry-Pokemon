import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import {
  fetchPokemons,
  orderCards,
  reset,
  fetchFilteredPokemons,
  getTypes,
} from "../../Redux/Actions";
import Nav from "../Nav/Nav";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortFilter, setSortFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (event) => {
    // console.log("handleFilter called");
    const finalFilter = event.value;
    if (finalFilter === "reset" || finalFilter === "") {
      dispatch(reset());
      setSortFilter("reset")
    } else {
      // console.log("Dispatching filterCards action");
      dispatch(fetchFilteredPokemons(finalFilter));
      setSortFilter(finalFilter);
    }
    console.log(pokemons)
  };

  const handleOrder = (option) => {
    const finalOrder = option.value;
    if (finalOrder === "reset" || finalOrder === "") {
      dispatch(reset());
      setSortOrder("reset");
    }
    dispatch(orderCards(finalOrder));
    setSortOrder(finalOrder);
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
      </div>
    </div>
  );
}
