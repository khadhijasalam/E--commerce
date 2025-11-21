import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = ({ product }) => {
  if (!product) return null;

  return (
    <div className="breadcrum">
      <Link to="/">HOME</Link>
      <img src={arrow_icon} alt="" />

      <Link to="/">SHOP</Link>
      <img src={arrow_icon} alt="" />

      <Link to={`/${product.category}`}>
        {product.category}
      </Link>
      <img src={arrow_icon} alt="" />

      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrum;
