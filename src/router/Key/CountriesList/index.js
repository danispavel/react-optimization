import React, { useEffect, useState } from "react";

const Item = ({ country, logPrefix }) => {
  useEffect(() => {
    console.log(`MOUNT: ${logPrefix}`);
  }, [logPrefix]);

  console.log(`RENDER: ${logPrefix}`);

  return (
    <button className="country-item">
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

const ListItemsNoKey = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  return (
    <>
      <h3>List without key attribute</h3>
      <button
        onClick={() => {
          console.log("rerender with no key");
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        click to re-render
      </button>
      {countries.map((country) => (
        <Item country={country} logPrefix="no key" />
      ))}
    </>
  );
};

const ListItemsNoKeyWithMemo = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  return (
    <>
      <h3>List without key with memoised item</h3>
      <button
        onClick={() => {
          console.log("rerender with no key with React.memo");
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        click to re-render
      </button>
      {countries.map((country) => (
        <ItemMemo country={country} logPrefix="no key-memo" />
      ))}
    </>
  );
};

const ListItemsWithRandom = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  return (
    <>
      <h3>List with random value in "key"</h3>
      <button
        onClick={() => {
          console.log("rerender random name in key");
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        click to re-render
      </button>
      {countries.map((country, index) => (
        <ItemMemo country={country} key={Math.random()} logPrefix="random" />
      ))}
    </>
  );
};

const ListItemsWithKey = ({ countries }) => {
  const [sort, setSort] = useState("asc");

  return (
    <>
      <h3>List with unique value in "key"</h3>
      <button
        onClick={() => {
          console.log("rerender country.name in key");
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        click to re-render
      </button>
      {countries.map((country, index) => (
        <ItemMemo
          country={country}
          key={country.name}
          logPrefix="country.name in key"
        />
      ))}
    </>
  );
};

export const CountriesList = ({ countries }) => {
  return (
    <>
      <div className="countries-list">
        <div>
          <ListItemsNoKey countries={countries} />
        </div>
        <div>
          <ListItemsNoKeyWithMemo countries={countries} />
        </div>
        <div>
          <ListItemsWithRandom countries={countries} />
        </div>
        <div>
          <ListItemsWithKey countries={countries} />
        </div>
      </div>
    </>
  );
};
