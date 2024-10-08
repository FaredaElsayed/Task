import React, { createContext, useState } from "react";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    nat: "",
    description: "",
    placeOfBirth: "",
    score: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState("");
  const [isFormVisible, setFormVisible] = useState(true);

  //fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    const { fname, mname, lname, nat } = formData;
    const requestBody = { fname, mname, lname, nat };
    console.log("Form Data Sent: ", formData, requestBody);

    try {
      const response = await fetch("http://localhost:900/individuals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred while fetching data.");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults([data]);
      console.log("API Response: ", data);
      setSearchHistory((prev) => [...prev, formData]);
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to show the form again
  const handleShowForm = () => {
    setFormVisible(true);
    setFormData({
      fname: "",
      mname: "",
      lname: "",
      nat: "",
      description: "",
      placeOfBirth: "",
      score: "",
    });
    setResults([]);
    setError("");
  };

  // Function to handle clicking on search history
  const handleSearchFromHistory = (search) => {
    setFormData(search);
  };

  // Function to clear search history
  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchContext.Provider
      value={{
        formData,
        handleChange,
        setFormData,
        results,
        loading,
        error,
        isFormVisible,
        handleSubmit,
        handleShowForm,
        searchHistory,
        setSearchHistory,
        handleSearchFromHistory,
        handleClearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
