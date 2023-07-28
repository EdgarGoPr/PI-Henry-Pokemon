import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home"
import Detail from "./components/Detail/Detail";
import Form from './components/Form/Form'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pokemons" element={<Home />} />
        <Route path = '/pokemons/:id' element = {<Detail/>}/>
        <Route path = '/pokemons/create' element = {<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
