import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // To handle categories
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  // To add products
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("logintoken");
      const firmId = localStorage.getItem("firmId");

      console.log("loginToken:", loginToken); // Logs token
      console.log("firmId:", firmId); // Logs firm ID

      if (!loginToken || !firmId) {
        console.error("User not authenticated or firm ID missing");
        return;
      }

      // Append data to formData
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      category.forEach((value) => {
        formData.append("category", value);
      });
      formData.append("bestseller", bestseller);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          token: loginToken, // Include the token in the headers
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully");
      } else {
        console.error("Failed to add product:", data.message);
        alert("Failed to add product: " + data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input
                type="radio"
                value="true"
                checked={bestseller === true}
                onChange={handleBestSeller}
              />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input
                type="radio"
                value="false"
                checked={bestseller === false}
                onChange={handleBestSeller}
              />
            </div>
          </div>
        </div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Product Image</label>
        <input type="file" onChange={handleImageUpload} />
        <div className="btnSubmit">
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
