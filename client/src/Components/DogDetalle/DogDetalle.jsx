import React, { useEffect } from "react";
import { getDogDetail, resetDogDetail } from "../actions/index";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import imgDog from "../../assets/dogsDefaul.jpg";
import "./DogDetalle.css";

const DogDetalle = () => {
  const { id } = useParams();
  const dog_detail = useSelector((state) => state.dog_detail);
  console.log("llega detalle", dog_detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => {
      dispatch(resetDogDetail());
    };
  }, []);

  return (
    <div className="detail_container">
      <div className="detal_home">
      <Link className="dvolve_home" to="/home">
        <h2>Volver</h2>
      </Link>
      </div>
      <div className="detail_info">
        {!dog_detail ? (
          <h1>no dog</h1>
        ) : (
          <div className="detail_data">
            <div className="detail_header">
              <div className="image_detail">
                <img
                  src={!dog_detail.image ? imgDog : dog_detail.image}
                  alt=""
                />
              </div>
              <div className="image_title">
                <h3>{dog_detail.name}</h3>
                <h3>{dog_detail.temperament}</h3>
                <h3>{dog_detail.weight.metric}</h3>
                <h3>{dog_detail.height.metric}</h3>
                <h3>{dog_detail.life_span}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogDetalle;
