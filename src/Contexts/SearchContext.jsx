import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    nat: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [isFormVisible, setFormVisible] = useState(true);

  // Fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    const { fname, mname, lname, nat } = formData;
    const requestBody = { fname, mname, lname, nat };
    console.log("Form Data Sent: ", formData, requestBody);

    try {
      const response = await fetch(
        "https://develop.thamar.sa/api/v1/integration/focal/screen/individual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred while fetching data.");
        throw new Error("Please Enter valid data");
      }

      const data = await response.json();
      const apiResults = data.screen_result;

      // Set results to the transformed data
      setResults(apiResults);
      console.log("API Response: ", data);

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
    });
    setResults([]);
    setError("");
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
