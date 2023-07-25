import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="menu_click" onClick={() => setShowMenu(!showMenu)}>
        Menu
      </div>
      {showMenu && (
        <div className="menu_list">
          <ul onClick={() => setShowMenu(!showMenu)}>
            <li onClick={() => navigate("/")}>Dashboard</li>
            <li onClick={() => navigate("/customer")}>Customer Info</li>
            <li onClick={() => navigate("/dealer")}>Dealer Info</li>
            <li onClick={() => navigate("/product")}>Product Info</li>
            <li onClick={() => navigate("/sell")}>Daily Sell</li>
            <li onClick={() => navigate("/buy")}>Daily Buy</li>
            <li onClick={() => navigate("/crdr")}>Joma/Uttolon</li>
            <li onClick={() => navigate("/all-stock")}>All Stock</li>

          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
