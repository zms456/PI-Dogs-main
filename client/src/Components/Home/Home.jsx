import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDogsFromBack } from "../actions/index";
import "./Home.css";
import { Link } from "react-router-dom";



const Home = ({ dogs, getRazaDogs }) => {

  const [currentpage, setCurrenPage] = useState(1);
  const dogsXpage = 15;
  const pagesButtons = [];
  let currentItems;

  const handleClickPage = (e) => {
    const { id } = e.target;
    setCurrenPage(id);
  };

  for (let i = 1; i <= Math.ceil(dogs.length / dogsXpage); i++) {
    pagesButtons.push(i);
  }

  const indexLast = currentpage * dogsXpage;
  const indexFirst = indexLast - dogsXpage;

  currentItems = dogs ? dogs.slice(indexFirst, indexLast) : false;

  const renderpageNumber = pagesButtons.map((page, index) => {
    return (
      <li key={page} id={page} onClick={handleClickPage}>
        {page}
      </li>
    );
  });

  useEffect(() => {
    getRazaDogs();

  }, []);

  return (
    <div className="dogs_container">
      <div className="dogs">
        {currentItems ? (
          currentItems.map((raza, index) => {
            return (
              <div key={index} className="dogs_card">
                <div className="img_container">
                  <img src={raza.image} alt="" />
                </div>
                <div>
                  <h3>Raza: {raza.name}</h3>
                  <h4> Temperamento: {raza.temperament}</h4>
                  <div className="cont_h_w">
                    <h3>Altura: {raza.height}</h3>
                    <h3>Peso: {raza.weight}</h3>
                  </div>
                  <h4>Años de vida: {raza.life_span}</h4>
                </div>
              </div>
            );
          })
        ) : (
          <h1>sin videogames</h1>
        )}
      </div>
      <div className="pagination_container">
        <ul>{renderpageNumber}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  return {
    dogs: state.dogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRazaDogs: function () {

      dispatch(getDogsFromBack());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);