import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import "./searchBar.css";
import { filtradoNombre, filterTemp } from "../actions/index";

function SearchBar({
  setCurrenPage,
  dogs,
  filtradoNombre,
  temperamentToProps,
  filterTemperamentos,
  handleOrder,
  handlePeso, // viene dede el home
}) {
  const [name, setNombre] = useState("");

  function handlecambiaNombre(e) {
    setNombre(e.target.value);
  }
  // filtrado por temperamento con el select - option
  function handleSelectTempFilter(e) {
    const value = e.target.value;
    filterTemperamentos(dogs, value);
  }

  function handlebuscarNombre(e) {
    e.preventDefault();
    filtradoNombre(name);
    setCurrenPage(1);
  }

  return (
    <>
      <div className="buscador_select_temps">
        <form action="" onSubmit={handlebuscarNombre} className="search-box">
          <input
            type="text"
            placeholder=" "
            onChange={handlecambiaNombre}
            value={name}
            required
          />
          <button type="submit"></button>
        </form>
        <select className="select-css" onChange={handleSelectTempFilter}>
          <option>Selecciona una opción</option>
          {temperamentToProps.length > 0 ? (
            temperamentToProps.map((temps) => {
              return (
                <option key={temps.id} value={temps.name}>
                  {temps.name}
                </option>
              );
            })
          ) : (
            <option>Temperamento Vacios</option>
          )}
        </select>
      </div>
      <div className="conteiner_search">
        <div className="container_serchBar">
          <div className="filter_az_za">
            <div>
              <button className="buttonFiltrados" id="0" onClick={handleOrder}>
                A-Z
              </button>
            </div>
            <div>
              <button className="buttonFiltrados" id="1" onClick={handleOrder}>
                Z-A
              </button>
            </div>
          </div>
          <div className="filter_weigth">
            <div>
              <button className="buttonFiltradosp" id="0" onClick={handlePeso}>
                minMax
              </button>
            </div>
            <div>
              <button className="buttonFiltradosp" id="1" onClick={handlePeso}>
                maxMin
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    temperamentToProps: state.temperaments, //temperaments viene del state global (temperaments:[] "../reducer/index")
  };
};

function mapDispatchToProps(dispatch) {
  return {
    filtradoNombre: function (name) {
      return dispatch(filtradoNombre(name));
    },

    filterTemperamentos: function (dogs, temps) {
      return dispatch(filterTemp(dogs, temps)); //parametros por prop "dogs, temps"llega del action
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
