import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../CSS/SearchResults.module.css";
import { SearchContext } from "../Contexts/SearchContext";

const SearchResults = () => {
  const { t, i18n } = useTranslation();
  const { results, handleShowForm, loading, error } = useContext(SearchContext);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const isDarkMode = document.body.classList.contains("dark");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const toggleDetails = (index) => {
    setSelectedResult(selectedResult === index ? null : index);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (startPage > 1) {
      pageNumbers.unshift(1);
      if (startPage > 2) pageNumbers.unshift("...");
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };
  const shouldShowAll = results.length > currentResults.length;

  return (
    <section
      className={styles.results}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h3 className={styles.resultsTitle}>{t("results")}</h3>
      {loading && <p>{t("loading")}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {results.length === 0 && !loading ? (
        <p>{t("no_matched_results")}</p>
      ) : (
        <>
          <ul className={styles.resultsList}>
            {(shouldShowAll ? results : currentResults).map((result, index) => (
              <li
                key={index}
                className={`${styles.resultsItem} ${
                  isDarkMode ? styles.dark : styles.light
                }`}
                onClick={() => toggleDetails(index)}
              >
                <article>
                  <header
                    className={
                      isDarkMode ? styles.headerDark : styles.headerLight
                    }
                  >
                    <strong>{t("name")}:</strong> {result.name} <br />
                    <strong>{t("score")}:</strong> {Number(result?.score)}%
                  </header>
                  <div className={styles.resultMeta}>
                    <span className={styles.resultType}>
                      {result?.entity_type}
                    </span>
                    <span className={styles.resultStatus}>
                      {result?.active_status}
                    </span>
                  </div>
                  {selectedResult === index && (
                    <div className={styles.resultDetails}>
                      {result?.nat && (
                        <p className={styles.detailItem}>
                          <strong>{t("nationality")}:</strong> {result?.nat}
                        </p>
                      )}

                      {result?.watch_list && (
                        <p className={styles.detailItem}>
                          <strong>{t("watch_list")}:</strong>{" "}
                          {result?.watch_list?.name}
                        </p>
                      )}
                      {result.gender && (
                        <p className={styles.detailItem}>
                          <strong>{t("gender")}:</strong> {result?.gender}
                        </p>
                      )}
                      {result?.date && (
                        <p className={styles.detailItem}>
                          <strong>{t("date_of_birth")}:</strong> {result?.date}
                        </p>
                      )}
                      {result?.descriptions &&
                        result?.descriptions.length > 0 && (
                          <div className={styles.detailItem}>
                            <h4>{t("description")}:</h4>
                            <ul>
                              {result?.descriptions?.map((desc, i) => (
                                <li key={i}>
                                  {desc?.description1}, {desc?.description2}
                                  {desc?.description3}.
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      {result?.addresses && result?.addresses.length > 0 && (
                        <div className={styles.detailItem}>
                          <h4>{t("address")}:</h4>
                          <p>
                            {`${result?.addresses?.[0]?.street} ${result?.addresses?.[0]?.city} ${result?.addresses?.[0]?.country}`.trim()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>

            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={
                  typeof pageNumber === "number"
                    ? pageNumber
                    : `ellipsis-${index}`
                }
                className={`${styles.pageButton} ${
                  pageNumber === currentPage ? styles.activePage : ""
                }`}
                onClick={() =>
                  typeof pageNumber === "number"
                    ? handlePageChange(pageNumber)
                    : null
                }
                disabled={typeof pageNumber !== "number"}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className={styles.pageButton}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        </>
      )}
      <button onClick={handleShowForm} className={styles.submitButton}>
        {t("search_again")}
      </button>
    </section>
  );
};

export default SearchResults;
