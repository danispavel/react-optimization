import React from "react";

import { CountriesList } from "./CountriesList";
import { CountriesList2 } from "./CountriesList2";
import { rawCountries } from "../../rawCountries";
import { Link } from "react-router-dom";

const getCountriesFromRawData = (raw) => {
  return rawCountries.map((value) => ({
    __typename: "country",
    name: String(value.name.common),
    id: String(value.cca2).toLowerCase(),
    independent: Boolean(value.independent),
    unMember: Boolean(value.unMember),
    flagUrl: `https://flagcdn.com/${String(value.cca2).toLowerCase()}.svg`,
    region: String(value.region),
    capital: value.capital.length ? String(value.capital[0]) : "",
    subregion: String(value.subregion),
  }));
};

const Key = () => (
  <div style={{ padding: "100px" }}>
    <h1>Key attribute</h1>
    <Link to="/first-render">To next topic "Don’t run first render"</Link>
    <p>
      React uses key attribute as a way to identify an element of the same type
      among its siblings during re-renders (see the docs:{" "}
      <a
        href="https://reactjs.org/docs/lists-and-keys.html"
        target="_blank"
        rel="noreferrer"
      >
        https://reactjs.org/docs/lists-and-keys.html
      </a>{" "}
      and{" "}
      <a
        href="https://reactjs.org/docs/reconciliation.html#recursing-on-children"
        target="_blank"
        rel="noreferrer"
      >
        https://reactjs.org/docs/reconciliation.html#recursing-on-children
      </a>
      ).In other words, it’s needed only during re-renders and for neighbouring
      elements of the same type, i.e. flat lists (this is important!).
    </p>
    <p>
      A simplified algorithm of the process during re-render looks like this:
    </p>
    <ul>
      <li>
        first, React will generate the “before” and “after” “snapshots” of the
        elements
      </li>
      <li>
        second, it will try to identify those elements that already existed on
        the page, so that it can re-use them instead of creating them from
        scratch
        <ul>
          <li>
            if the “key” attribute exists, it will assume that items with the
            same “before” and “after” key are the same
          </li>
          <li>
            if the “key” attribute doesn’t exist, it will just use sibling’s
            indexes as the default “key”
          </li>
        </ul>
      </li>
      <li>
        third, it will:
        <ul>
          <li>
            get rid of the items that existed in the “before” phase, but don’t
            exist in the “after” (i.e. unmount them)
          </li>
          <li>
            create from scratch items that haven’t existed in the “before”
            variant (i.e. mount them)
          </li>
          <li>
            update items that existed “before” and continue to exist “after”
            (i.e. re-render them)
          </li>
        </ul>
      </li>
    </ul>
    <h2>Check "random key" and "without key" behavior</h2>
    <p>Below you could see 4 lists of countries that rendered: </p>
    <ul>
      <li>without key attribute</li>
      <li>without key attribute but with using React memo</li>
      <li>with random value as key</li>
      <li>with country name as key</li>
    </ul>
    <p>
      Each list contains 250 countries, each country item has: console.log with
      MOUNT and RENDER mark.
    </p>
    <p>You could check their re-render behavior in console.</p>
    <CountriesList countries={getCountriesFromRawData()} />
    <p>
      As you see React.memo fix "without key" behavior, but{" "}
      <b>unique key works as well.</b>
    </p>
    <p>
      In other way you see that <b>random key</b> value and render{" "}
      <b>without key</b> are <b>bad ideas</b>.
    </p>
    <h2>Check index using as key</h2>
    <p>
      Another example below shows difference between using name and index as key
      for sorted list.
    </p>
    <p>You can check behavior in console too with marks MOUNT2 and RENDER2</p>
    <CountriesList2 countries={getCountriesFromRawData()} />
    <p>
      As you see for lists with dynamic changes index using is bad idea. You can
      use it only for static list with static length and order.
    </p>
    <h2>Summary</h2>
    <ul>
      <li>
        never use random value in the “key” attribute: it will cause the item to
        re-mount on every render. Unless of course, this is your intention
      </li>
      <li>
        there is no harm in using the array’s index as “key” in “static” lists -
        those whose items number and order stay the same
      </li>
      <li>
        use item unique identifier (“id”) as “key” when the list can be
        re-sorted or items can be added in random places
      </li>
    </ul>
    <Link to="/first-render">To next topic "Don’t run first render"</Link>
  </div>
);

export default Key;
