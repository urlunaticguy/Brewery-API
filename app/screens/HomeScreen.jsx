"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../homescreen.module.css";
function HomeScreen() {
  const [breweriesCount, setBreweriesCount] = useState(0);
  const [breweriesData, setBreweriesData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const listOfOptions = [
    "All states",
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    // Idaho,
    // Illinois,
    // Indiana,
    // Iowa,
    // Kansas,
    // Kentucky,
    // Louisiana,
    // Maine,
    // Maryland,
    // Massachusetts,
    // Michigan,
    // Minnesota,
    // Mississippi,
    // Missouri,
    // Montana,
    // Nebraska,
    // Nevada,
    // New_Hampshire,
    // New_Jersey,
    // New_Mexico,
    // New_York,
    // North_Carolina,
    // North_Dakota,
    // Ohio,
    // Oklahoma,
    // Oregon,
    // Pennsylvania,
    // Rhode_Island,
    // South_Carolina,
    // South_Dakota,
    // Tennessee,
    // Texas,
    // Utah,
    // Vermont,
    // Virginia,
    // Washington,
    // West_Virginia,
    // Wisconsin,
    // Wyoming,
  ];

  const handleSearchedTextInputChange = (event) => {
    setSearchedText(event.target.value);
    handleSearchClick();
  };

  // handle Search click
  const handleSearchClick = () => {
    const breweries = breweriesData.filter((brewery) =>
      brewery.name.toLowerCase().includes(searchedText.toLowerCase())
    );

    setSearchResults(breweries);
  };

  useEffect(() => {
    console.log("Search results got changed");
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    const callAPI = async () => {
      const API_URL = "https://api.openbrewerydb.org/v1/breweries";

      try {
        axios.get(API_URL).then((response) => {
          console.log(response.data);
          setBreweriesCount(response.data.length);
          setBreweriesData(response.data);
          setSearchResults(response.data);
        });
      } catch (error) {
        console.log("Error occured");
        console.log(error);
      }
    };

    callAPI();
    console.log("hello world");
  }, []);

  return (
    <div className={styles.mainDiv}>
      <h1>Breweries</h1>
      <h2>API URL : https://api.openbrewerydb.org/v1/breweries</h2>

      <div>
        <input
          type="text"
          value={searchedText}
          onChange={handleSearchedTextInputChange}
          placeholder="Search by name, city"
        />

        {/* select state dropdown */}
        <select>
          {listOfOptions.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
          {/* <option>All states</option> */}
        </select>
      </div>

      <div>
        <p>
          Found <span>{breweriesCount}</span> breweries
        </p>
      </div>

      <table className={styles.table}>
        <th className={styles.tableHeader}>
          <td className={styles.cell}>Name</td>
          <td className={styles.cell}>City</td>
          <td className={styles.cell}>State</td>
          <td className={styles.cell}>Website</td>
        </th>
        {searchResults &&
          searchResults.map((data, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{data.name}</td>
              <td className={styles.cell}>{data.city}</td>
              <td className={styles.cell}>{data.state}</td>
              <td className={styles.cell}>
                {data.website_url === null ? (
                  "not available"
                ) : (
                  <Link href={data.website_url} target="_blank">
                    {data.website_url}
                  </Link>
                )}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default HomeScreen;
