import React from "react";
import { Link } from "react-router-dom";

const Rerender = () => {
  return (
    <div style={{ padding: "100px" }}>
      <Link to="/first-render">Back to "Don’t run first render"</Link>
      <h1>Don’t re-render if not needed</h1>
      <p>
        React rerenders children components after parent component rerender,
        it's not always necessary. To prevent children component rerender use
        React.memo. If children components have some handlers that were defined
        in parent component use React.useCallback for them.
      </p>
      <h1>Don’t rerun expensive computations</h1>
      <p>
        Sometimes we’ll have performance-intensive computations in our React
        components – between a component’s function signature and return block –
        which run on every render.
      </p>
      <p>
        If all arguments are passed to a function, it’s acceptable to have it
        outside the component. It prevents creating the function on every
        render, so the useCallback hook becomes unnecessary.
      </p>
      <p>
        Better to extract this function outside and run it with useMemo hook, it
        improves performance.
      </p>
      <Link to="/first-render">Back to "Don’t run first render"</Link>
    </div>
  );
};

export default Rerender;
