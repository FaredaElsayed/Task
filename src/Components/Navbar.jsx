import React from "react";
import LanguageSwitcher from "./LanguageSwitcher"; 
import styles from "./CSS/Navbar.module.css"; 

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src="https://sarmad.sa/images/sarmadLogoHeader.svg"
          alt="Sarmad Logo"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
