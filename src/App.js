// import React from "react";
// import SearchForm from "./Components/SearchForm"; 
// import Navbar from "./Components/Navbar";
// import { SearchProvider } from "./Components/Contexts/SearchContext";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <SearchProvider>
//         <SearchForm />
//       </SearchProvider>
//     </>
//   );
// };

// export default App;

import React from "react";
import SearchForm from "./Components/SearchForm";
import Navbar from "./Components/Navbar";
import { SearchProvider } from "./Components/Contexts/SearchContext";
import { ThemeProvider } from "./Components/Contexts/ThemeContext"; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <SearchProvider>
        <SearchForm />
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;

