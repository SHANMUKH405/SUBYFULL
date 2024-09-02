import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProducts from "../components/forms/AddProducts";
import Welcome from "../components/Welcome";

const LandingPage = () => {
  // usestates for routing accordingly

  const [showLogin, setShowLogin] = useState(false);

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowproducts(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowWelcome(false);
  };

  //   for register dynamic routing

  const [showRegister, setShowRegister] = useState(false);

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowproducts(false);
    setShowFirm(false);
    setShowWelcome(false);
  };

  //   for add firm , add products , all products routing

  const [showFirm, setShowFirm] = useState(false);
  const [showProducts, setShowproducts] = useState(false);
  const [allProducts, setAllProducts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const showFirmHandler = () => {
    setShowFirm(true);
    setShowproducts(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(false);
  };

  const showProductHandler = () => {
    setShowproducts(true);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(false);
  };

  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowproducts(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
  };

  const allProductsHandler = () => {
    setAllProducts(true);
    setShowproducts(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <section className="landingSection">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
        />

        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            allProductsHandler={allProductsHandler}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && <AddFirm />}
          {showProducts && <AddProducts />}
          {showWelcome && <Welcome />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
