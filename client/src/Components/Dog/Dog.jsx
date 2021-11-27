import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperament, } from "../actions/index";
import "./Dog.css";

const Dog = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const initialGame = {
    name: "",
    description: "",
    released: "",
    rating: "",
  };
  // hooks
  const [previewImg, setPreviewImg] = useState(null);
  const [image, setImage] = useState();
  const [dogsObj, setDogObj] = useState(initialGame);
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
    console.log(e.target.checked, e.target.name);
    setCheckboxObj({
      ...checkboxObj,
      [id]: checked,
    });
  };

  const getArrayTemperament = () => {
    let arrayCheksTemperament = [];
    for (const property in checkboxObj) {
      if (checkboxObj[property]) {
        arrayCheksTemperament.push(parseInt(property));
      }
    }
    return arrayCheksTemperament;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrayChecksTemperament = getArrayTemperament();

    const formData = new FormData();

    formData.append("name", dogsObj.name);
    formData.append("height", dogsObj.height);
    formData.append("weight", dogsObj.weight);
    formData.append("life_span", dogsObj.life_span);
    formData.append("temperament", JSON.stringify(arrayChecksTemperament));
    formData.append("image", image);

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
    dispatch(getTemperament());
  }, []);
  return (
    <div>
      <h1>Registrar una nueva Raza</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Raza: </label>
        <input type="text" name="name" onChange={handleInputChange} />
        <label htmlFor="">height: </label>
        <input type="text" name="height" id="" onChange={handleInputChange} /><br></br>
        <label htmlFor="">weight: </label>
        <input type="text" name="weight: " onChange={handleInputChange} />
        <label htmlFor="">Años de vida: </label>
        <input type="text" name="life_span" onChange={handleInputChange} /><br></br>
        <label htmlFor="">imagen</label>
        <input type="file" name="image" onChange={handleFileChange} />
        <img
          src={!previewImg ? "Noimage" : previewImg}
          alt=""
          width="150"
          height="150"
        />

        <br />
        <br />
        <h2>Temperamentos</h2>
        <div className="temperaments_container">
          {temperaments.length > 0 ? (
            temperaments.map((dogs) => {
              return (
                <div key={dogs.id} className="control_genre">
                  <input
                    type="checkbox"
                    id={dogs.id}
                    name={dogs.name}
                    onChange={handleCkeckboxChange}
                  />
                  <span>{dogs.name}</span>
                </div>
              );
            })
          ) : (
            <h2>Sin Temperamentos</h2>
          )}
        </div>
        <button type="submit"> Guardar </button>
      </form>
    </div>
  );
};

export default Dog;