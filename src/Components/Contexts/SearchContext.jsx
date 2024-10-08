// SearchContext.js
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
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    setResults([]); // Clear previous results

    console.log("Form Data Sent: ", formData); // Log form data

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData), // Send the form data
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred while fetching data.");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults([data]);
      console.log("API Response: ", data); // Log API response
      setSearchHistory((prev) => [...prev, formData]); // Save to search history
      setFormVisible(false); // Hide the form after submission
    } catch (err) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchResults(); // Call the fetch results function
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update form data based on input name
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
    setResults([]); // Clear results when showing form
    setError(""); // Clear any error messages
  };

  // Function to handle clicking on search history
  const handleSearchFromHistory = (search) => {
    setFormData(search); // Populate form with previous search data
  };

  // Function to clear search history
  const handleClearHistory = () => {
    setSearchHistory([]); // Clear the search history
  };
  return (
    <SearchContext.Provider
      value={{
        formData,
        handleChange,
        results,
        loading,
        error,
        isFormVisible,
        handleSubmit,
        handleShowForm,
        searchHistory,
        handleSearchFromHistory,
        handleClearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
