// import React from "react";
// import LanguageSwitcher from "./LanguageSwitcher"; 
// import styles from "./CSS/Navbar.module.css"; 

// const Navbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <img
//           src="https://sarmad.sa/images/sarmadLogoHeader.svg"
//           alt="Sarmad Logo"
//           className={styles.logoImage}
//         />
//       </div>
//       <div className={styles.languageSwitcherContainer}>
//         <LanguageSwitcher />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeContext } from "./Contexts/ThemeContext"; // Import ThemeContext
import styles from "./CSS/Navbar.module.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get theme state

  return (
    <nav
      className={`${styles.navbar} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.logo}>
        <img
          src="https://sarmad.sa/images/sarmadLogoHeader.svg"
          alt="Sarmad Logo"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.controls}>
        <button onClick={toggleTheme}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
