import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Noimage from "../../assets/noimg.jpg";
import { getTemperaments, } from "../actions/index";
import "./Dog.css";

const Dog = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const initialDogs = {
    name: "",
    height: "",
    weight: "",
    life_span: "",
  };
  // hooks
  const [previewImg, setPreviewImg] = useState(null);
  const [image, setImage] = useState();
  const [dogsObj, setDogObj] = useState(initialDogs);
  const [checkboxObj, setCheckboxObj] = useState();

  const handleFileChange = (e) => {
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
    setPreviewImg(imgPreview);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDogObj({
      ...dogsObj,
      [name]: value,
    });
  };

  const handleCkeckboxChange = (e) => {
    const { checked, id } = e.target;
    setCheckboxObj({
      ...checkboxObj,
      [id]: checked,
    });
  };

  const getArrayTemperaments = () => {
    let arrayCheksTemperaments = [];
    for (const property in checkboxObj) {
      if (checkboxObj[property]) {
        arrayCheksTemperaments.push(parseInt(property));
      }
    }
    return arrayCheksTemperaments;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrayChecksTemperaments = getArrayTemperaments();

    const formData = new FormData();

    formData.append("name", dogsObj.name);
    formData.append("height", dogsObj.height);
    formData.append("weight", dogsObj.weight);
    formData.append("life_span", dogsObj.life_span);
    formData.append("image", image);
    formData.append("temperament", JSON.stringify(arrayChecksTemperaments));

    const response = await fetch(`http://localhost:3001/dog`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.status === 201) {
      console.log("regsitro exitoso");
    } else {
      console.log("Oops algo paso!!");
    }
  };
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div className="contenedor">
      <Link to="/home">
                <h2>Volver Home</h2>
            </Link>
      <h1 className="logo"><span className="nombre-empresa">REGISTRAR UNA NUEVA</span> RAZA</h1>
      <div className="wrapper animated bounceInLeft">
        <div class="info-empresa">
          <ul className="servicios">
            <li><i className="fa fa-map-marker"></i> Buenos Aires - Argentina</li>
            <li><i className="fa fa-mobile"></i> +549 1124642816</li>
            <li><i className="fa fa-envelope"></i> rydermichel@gmail.com</li>
          </ul>
        </div>
        <div className="contacto">
          <form action="" onSubmit={handleSubmit} className="formulario">
            <p>
              <label>Raza</label>
              <input type="text" name="name" onChange={handleInputChange} required />
            </p>
            <p>
              <label>Altura</label>
              <input type="text" name="height" onChange={handleInputChange} required />
            </p>
            <p>
              <label>Peso</label>
              <input type="text" name="weight" onChange={handleInputChange} required />
            </p>
            <p>
              <label>Años de vida</label>
              <input type="text" name="life_span" onChange={handleInputChange} required />
            </p>
            <p className="img">
              <input type="file" name="image" onChange={handleFileChange} required />
              <img
                src={!previewImg ? Noimage : previewImg}
                alt=""
                width="150"
                height="150"
              />
            </p>
            <br />
            <br />
        <div className="temperamentos_container">
          {temperaments.length > 0 ? (
            temperaments.map((tempes) => {
              return (
                <div key={tempes.id} className="control_temp">
                  <input
                    type="checkbox"
                    id={tempes.id}
                    name={tempes.name}
                    onChange={handleCkeckboxChange}
                  />
                  <span>{tempes.name}</span>
                </div>
              );
            })
          ) : (
            <h2>Sin temperamentos</h2>
          )}
        </div>
            <p className="full">
              <button type="submit" className="boton-enviar">Guardar</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dog;