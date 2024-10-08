import React from "react";
import SearchForm from "./Components/SearchForm"; 
import Navbar from "./Components/Navbar";
import { SearchProvider } from "./Components/Contexts/SearchContext";

const App = () => {
  return (
    <>
      <Navbar />
      <SearchProvider>
        <SearchForm />
      </SearchProvider>
    </>
  );
};

export default App;
