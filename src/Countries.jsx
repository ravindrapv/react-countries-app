import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Header from "./Header";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const byName = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const byRegion =
        selectedRegion === "All" || country.region === selectedRegion;

      return byName && byRegion;
    });

    setFilteredCountries(filtered);
  }, [countries, searchTerm, selectedRegion]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <Header />
      <div className="flex flex-wrap justify-between items-center my-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Filter by Region:</label>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredCountries.map((item) => (
            <Link
              key={item.cca2}
              to={`/countries/${item.cca2}`} // unique identifier
              className="w-72 m-4"
            >
              <div>
                <img
                  src={item.flags.png}
                  alt="flag"
                  loading="lazy"
                  className="rounded-t-2xl shadow-2xl w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="bg-white shadow-2xl rounded-b-3xl p-4">
                  <h2 className="text-center text-gray-800 text-xl font-bold pb-4">
                    {item.name.common}
                  </h2>
                  <p className="text-center text-gray-500">
                    Population: {item.population}{" "}
                  </p>
                  <div className="mt-4 p-2 bg-indigo-50 rounded-2xl text-center">
                    <p>Region: {item.region}</p>
                  </div>
                  <div className="text-center mt-4">
                    <p>Capital: {item.capital}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
