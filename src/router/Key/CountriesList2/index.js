import React, { useEffect, useState } from "react";

import orderBy from "lodash/orderBy";


const Item = ({
  country,
  logPrefix
}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    console.log(`MOUNT2: ${logPrefix}`);
  }, [logPrefix]);

  console.log(`RENDER2: ${logPrefix}`);

  return (
    <button
      className={`country-item ${isActive ? "active" : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <img
        src={country.flagUrl}
        width={70}
        style={{ marginRight: "8px" }}
        alt={country.name}
      />
      {country.name}
    </button>
  );
};

const ItemMemo = React.memo(Item);

const ListItemsWithIndex = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  const sortedCountries = orderBy(countries, "name", sort);

  const button = (
    <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
      toggle sorting: {sort}
    </button>
  );

  return (
    <>
      <h3>List with index in "key"</h3>
      {button}
      {sortedCountries.map((country, index) => (
        <ItemMemo country={country} key={index} logPrefix="index" />
      ))}
    </>
  );
};

const ListItemsWithId = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  const sortedCountries = orderBy(countries, "name", sort);

  const button = (
    <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
      toggle sorting: {sort}
    </button>
  );

  return (
    <>
      <h3>List with name in "key"</h3>
      {button}
      {sortedCountries.map((country) => (
        <ItemMemo country={country} key={country.name} logPrefix="name" />
      ))}
    </>
  );
};

export const CountriesList2 = ({ countries }) => {
  return (
    <>
      <div className="countries-list">
        <div>
          <ListItemsWithId countries={countries} />
        </div>
        <div>
          <ListItemsWithIndex countries={countries} />
        </div>
      </div>
    </>
  );
};
