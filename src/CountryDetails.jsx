import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DarkModeToggle from "./DarkModeToggle";

const CountryDetails = () => {
  const { cca2 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${cca2}`
        );
        setCountry(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchCountryDetails();
  }, [cca2]);

  if (!country) {
    return (
      <div class="wrapper">
        <div class="blue ball"></div>
        <div class="red ball"></div>
        <div class="yellow ball"></div>
        <div class="green ball"></div>
      </div>
    );
  }

  const {
    name,
    flags,
    region,
    capital,
    population,
    borders,
    tld,
    currencies,
    languages,
  } = country;

  return (
    <div className="container mx-auto max-w-screen-lg">
      <DarkModeToggle />
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Back to Home
      </Link>
      <div className="flex justify-between items-center mt-8">
        {flags && (
          <img
            src={flags.png}
            alt={`${name?.common} flag`}
            className="rounded-lg shadow-lg object-cover w-80"
          />
        )}
        <div className="ml-8">
          {name && (
            <>
              <h2 className="text-3xl font-bold mb-2">{name.common}</h2>
              <p className="text-gray-600">{region}</p>
              <p className="text-gray-600">Capital: {capital}</p>
              <p className="text-gray-600">Population: {population}</p>
              <p className="text-gray-600">
                Native Name: {name.nativeName?.fra?.official}
              </p>
            </>
          )}
        </div>
        <div>
          <p className="text-gray-600">Top Level Domain: {tld}</p>
          {currencies && (
            <p className="text-gray-600">Currencies: {currencies?.XOF?.name}</p>
          )}
          {languages && (
            <p className="text-gray-600">Languages: {languages.fra}</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Neighboring Countries</h3>
        {borders && borders.length > 0 ? (
          <div className="flex flex-wrap gap-3 space-x-4">
            {borders.map((borderCountryCode) => (
              <Link
                key={borderCountryCode}
                to={`/countries/${borderCountryCode}`}
                className="flex-shrink-0"
              >
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  {borderCountryCode}
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <p>No neighboring countries found.</p>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
