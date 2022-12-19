import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const WithFirstRenderItem = ({ children }) => {
  const [result, setResult] = useState("");
  useEffect(() => {
    console.log(children, " render:", result);
  }, [children, result]);

  return (
    <div onClick={() => setResult("activated")}>
      {children} {result}
    </div>
  );
};

const WithoutFirstRenderItem = ({ children }) => {
  const [result, setResult] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log(children, " render:", result);
    }
  }, [result, children]);

  return (
    <div onClick={() => setResult("activated")}>
      {children} {result}
    </div>
  );
};

const FirstRender = () => {
  return (
    <div style={{ padding: "100px" }}>
      <h1>Don’t run on first render</h1>
      <Link to="/rerender">
        Next to "Don’t re-render if not needed" and "Don’t rerun expensive
        computations"
      </Link>
      <br />
      <Link to="/">Back to "Key attribute"</Link>
      <p>
        Sometimes we had some complicated calculation in useEffect Hook, that is
        necessary only after interaction with component. You can see example of
        component below:
      </p>
      <pre>
        <code>{`const WithFirstRenderItem = ({ children }) => {
  const [result, setResult] = useState("");
  useEffect(() => {
    //some calculation here
    console.log(children, " render:", result);
  }, [children, result]);

  return (
    <div onClick={() => setResult("activated")}>
      {children} {result}
    </div>
  );
};`}</code>
      </pre>
      <p>
        We could turn off it by using useRef Hook, let's add some changes to
        component below
      </p>
      <pre>
        <code>{`const WithoutFirstRenderItem = ({ children }) => {
  const [result, setResult] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      //some calculation here
      console.log(children, " render:", result);
    }
  }, [result, children]);

  return (
    <div onClick={() => setResult("activated")}>
      {children} {result}
    </div>
  );
};`}</code>
      </pre>
      We rendered this components:
      <pre>
        <code>
          {`
          <WithFirstRenderItem> Item with first render</WithFirstRenderItem>
          <WithoutFirstRenderItem>
            Item without first render
          </WithoutFirstRenderItem>
 `}
        </code>
      </pre>
      <p>Click on components below and check in console how it works.</p>
      <div style={{ color: "red" }}>
        <WithFirstRenderItem> Item with first render</WithFirstRenderItem>
        <WithoutFirstRenderItem>
          Item without first render
        </WithoutFirstRenderItem>
      </div>
      <p>
        As you see we prevented unnecessary calculation.This technique isn’t
        only used for performance optimizations, but for the sake of having a
        side effect run only when a component re-renders.
      </p>
      <Link to="/rerender">
        Next to "Don’t re-render if not needed" and "Don’t rerun expensive
        computations"
      </Link>
      <br />
      <Link to="/">Back to "Key attribute"</Link>
    </div>
  );
};

export default FirstRender;
