import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchBar from "../Search/SearchBar";

import "./Nav.css";

const Nav = ({ sourceOptions, handleFilterSource, sortOptions, sortOrder, handleOrder, sortOptionsF, sortFilter, handleFilter, }) => {

  return (
    <div className="Nav">
      <Link to="/" className="HomeButton">
        <button className="Inicio">Landing</button>
      </Link>
      <div className="FilterBar">
        <Select
          options={sourceOptions}
          value={
            sourceOptions.find((option) => option.value === sortFilter) ||
            sourceOptions[0]
          }
          onChange={(event) => handleFilterSource(event)}
        />
      </div>
      <div className="FilterBar">
        <Select
          options={sortOptionsF}
          value={
            sortOptionsF.find((option) => option.value === sortFilter) ||
            sortOptionsF[0]
          }
          onChange={(event) => handleFilter(event)}
        />
      </div>
      <div className="SortBar">
        <Select
          options={sortOptions}
          value={
            sortOptions.find((option) => option.value === sortOrder) ||
            sortOptions[0]
          }
          onChange={handleOrder}
        />
      </div>
      <SearchBar />
      <Link to="/pokemons/create">
        <button className="CreateButton">Create Pokemon</button>
      </Link>
    </div>
  );
};

export default Nav;
