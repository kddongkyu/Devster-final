import React, { useEffect, useState } from "react";
import "./style/Modal.css";

function MenuModal({ isMenuOpen, setIsMenuOpen, selectedMemberImage }) {
  const closeMenuBar = () => {
    setIsMenuOpen(false);
  };

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="menu-modal-box">
      <div className="moblie-menu-modal">
        <div className="menu-modal">
          <img
            className="menu-modal-close-icon"
            alt=""
            src={require("./assets/menu_modal_close.svg").default}
            onClick={closeMenuBar}
          />
          {selectedMemberImage && (
            <img src={selectedMemberImage} alt="Member" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
