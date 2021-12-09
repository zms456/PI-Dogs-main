import React, { useEffect } from "react";
import { getDogDetail,resetDogDetail} from "../actions/index";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import imgDog from "../../assets/dogsDefaul.jpg";
import "./DogDetalle.css";

const DogDetalle = () => {
  const {id} = useParams();
  const dog_detail = useSelector((state) => state.dog_detail);
  console.log("llega detalle", dog_detail)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => {
        dispatch(resetDogDetail());
      };
  }, []);

  return (
    <div
      className="detail_container"
      
    >
      <h1>Detalle dog</h1>
      <div className="detail_info">
        {!dog_detail ? (
          <h1>no dog</h1>
        ) : (
          <div className="detail_data">
            <div className="detail_header">
              <div className="image_detail">
                <img  src={!dog_detail.image ? imgDog : dog_detail.image} alt="" />
              </div>
              <div className="image_title">
                <h1>{dog_detail.name}</h1>
                <h1>{dog_detail.temperament}</h1>
                <h1>{dog_detail.weight.metric}</h1>
                <h1>{dog_detail.height.metric}</h1>
                <h1>{dog_detail.life_span}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogDetalle;
