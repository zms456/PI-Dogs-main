import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import imgDog from "../../assets/dogsDefaul.jpg";
import {
  getDogsFromBack,
  orderNamiento,
  getTemperamentsBack,
  orderWeight,
} from "../actions/index";

import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

//inicio funcion home
const Home = ({
  dogs, //dogs:
  filtradoss,
  getRazaDogs,
  ordenamientoazza,
  getTemperamentsBacks,
  orderWeights,
}) => {
  // ternario para setear los dogs sobre los cuales se van a mapear
  const dogsForMap = filtradoss.length > 0 ? filtradoss : dogs;
  //console.log("home llega...",dogsForMap)
  const [currentpage, setCurrenPage] = useState(1);
  const dogsXpage = 8;
  const pagesButtons = [];

  let currentItems;

  const handleClickPage = (e) => {
    const { id } = e.target;
    setCurrenPage(id);
  };

  for (let i = 1; i <= Math.ceil(dogsForMap.length / dogsXpage); i++) {
    pagesButtons.push(i);
  }

  const indexLast = currentpage * dogsXpage;
  const indexFirst = indexLast - dogsXpage;

  currentItems = dogsForMap ? dogsForMap.slice(indexFirst, indexLast) : false;

  const renderpageNumber = pagesButtons.map((page, index) => {
    return (
      <li key={page} id={page} onClick={handleClickPage}>
        {page}
      </li>
    );
  });

  //ordernamiento start datos del serchbar
  const handleOrder = (e) => {
    const { id } = e.target;
    //console.log("home 63",dogsForMap)
    ordenamientoazza([...dogsForMap], parseInt(id)); //copia de dogsForMap
    //setCurrenPage(1)
  };
  const handlePeso = (e) => {
    const { id } = e.target
      //console.log("home 63",dogsForMap)
      orderWeights([...dogsForMap], parseInt(id))
      //copia de dogsForMap
    //setCurrenPage(1)
  };
  //fin ordenamiento

  useEffect(() => {
    getRazaDogs();
    getTemperamentsBacks(); //llena datos en el reducer ("temperaments:[]")
  }, []);

  return (
    <div className="dogs_container">
      <div className="cont_link">
            <Link className="link" to="/create/dog">
              <h2>Agregar Dogs</h2>
            </Link>
          </div>
      <div>
        <div className="menu_seachBar">
          
          <div>
            <SearchBar
              setCurrenPage={setCurrenPage}
              dogs={dogs}
              handleOrder={handleOrder}
              handlePeso={handlePeso}
            />
          </div>
        </div>
        <div className="dogs">
          {currentItems ? (
            currentItems.map((raza, index) => {
              return (
                <div className="conteiner_dogs" key={index}>
                  <div className="a-box">
                    <Link className="llink" to={`/dog/detalle/${raza.id}`}>
                      <div className="cont inner-skew">
                        <img src={!raza.image ? imgDog : raza.image} alt="" />
                      </div>
                      <div class="text-container">
                        <h1>{raza.name}</h1>
                        <h3>{raza.temperament}</h3>
                        <div className="cont_h_w">
                          <h3>Altura: {raza.height}</h3>
                          <h3>Peso: {raza.weight}</h3>
                        </div>
                        <h3>Años de vida: {raza.life_span}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>sin dogs</h1>
          )}
        </div>
        <div className="pagination_container">
          <ul>{renderpageNumber}</ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
    filtradoss: state.filtrados, //filtrados viene del state global (filtrados:[] "../reducer/index")
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRazaDogs: function () {
      dispatch(getDogsFromBack());
    },
    getTemperamentsBacks: function () {
      return dispatch(getTemperamentsBack());
    },
    ordenamientoazza: function (dogs, value) {
      return dispatch(orderNamiento(dogs, value));
    },
    orderWeights: function (dogs, value) {
      return dispatch(orderWeight(dogs, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
