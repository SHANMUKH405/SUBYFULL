import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [offer, setOffer] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("logintoken");

      if (!loginToken) {
        console.error("User not Authenticated");
        return; // Stop form submission if not authenticated
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((value) => {
        formData.append("region", value);
      });

      if (file) {
        formData.append("firmImage", file);
      }

      // api

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json(); // Corrected line

      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);

        alert("Firm added successfully");
      }
      console.log("this is firmId", data.firmId);
      const mango = data.firmId;

      localStorage.setItem("firmId", mango);
    } catch (error) {
      console.error("Failed to add firm", error);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>Add Firm</h2>
        <label htmlFor="firmName">Firm Name</label>
        <input
          type="text"
          id="firmName"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />
        <label htmlFor="area">Area</label>
        <input
          type="text"
          id="area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label htmlFor="veg">Veg</label>
              <input
                type="checkbox"
                id="veg"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label htmlFor="non-veg">Non-Veg</label>
              <input
                type="checkbox"
                id="non-veg"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <label htmlFor="offer">Offer</label>
        <input
          type="text"
          id="offer"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regionboxContainer">
              <label htmlFor="southindian">South Indian</label>
              <input
                type="checkbox"
                id="southindian"
                value="southindian"
                checked={region.includes("southindian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxContainer">
              <label htmlFor="northindian">North Indian</label>
              <input
                type="checkbox"
                id="northindian"
                value="northindian"
                checked={region.includes("northindian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxContainer">
              <label htmlFor="chinese">Chinese</label>
              <input
                type="checkbox"
                id="chinese"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxContainer">
              <label htmlFor="bakery">Bakery</label>
              <input
                type="checkbox"
                id="bakery"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label htmlFor="firmImage">Firm Image</label>
        <input type="file" id="firmImage" onChange={handleImageUpload} />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
