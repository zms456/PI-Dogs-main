import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDogsFromBack, getTemperaments } from "../actions/index";
import "./Home.css";

const Home = ({ dogs, getRazaDogs, getTemperaments}) => {

  const [currentpage, setCurrenPage] = useState(1);
  const dogsXpage = 8;
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
    getRazaDogs() ;
    getTemperaments();

  }, []);

  return (
    <div className="dogs_container">
      <div className="dogs">
        {currentItems ? (
          currentItems.map((raza, index) => {
            return (
              <div className="a-box">
                <div className="img-container">
                  <div className="img-inner">
                    <div key={index} className="inner-skew">
                      <img src={raza.image} alt="" />
                    </div>
                  </div>
                </div>
                <div class="text-container">
                  <h3>{raza.name}</h3>
                  <h4>{raza.temperament}</h4>
                  <div className="cont_h_w">
                    <h4>Altura: {raza.height}</h4>
                    <h4>Peso: {raza.weight}</h4>
                  </div>
                  <h4>Años de vida: {raza.life_span}</h4>
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
    </div >
  );
};

const mapStateToProps = (state) => {

  return {
    dogs: state.dogs,
    temperamento: state.temperament,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getRazaDogs: function () {

      dispatch(getDogsFromBack());
    },
    getTemperaments: function () {
      dispatch(getTemperaments());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);