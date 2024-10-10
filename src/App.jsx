import React from "react";
import SearchForm from "./Components/SearchForm";
import Navbar from "./Components/Navbar";
import { SearchProvider } from "./Contexts/SearchContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import "./App.css";
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
