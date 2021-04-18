import React, { useState } from "react";

import useSWR, { mutate } from "swr";

// import Head from "next/head";
// import styles from "../styles/Home.module.css";

const api_fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

//
// in keeping w swr/examples/optimistic-ui/
//

const MockPage = () => {
  const [text, setText] = useState("");

  const { data } = useSWR("/api/test/textdata", api_fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update local data, but do not revalidate
    mutate("/api/test/textdata", [...data, text], false);

    // trigger a refetch
    mutate(
      "/api/test/textdata",
      await api_fetcher("/api/test/textdata", {
        method: "POST",
        body: JSON.stringify({ text }),
      })
    );

    setText("");
  };

  if (!data) return <h2>loading . . .</h2>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Create</button>
      </form>
      <ul>
        {data
          ? data.map((datum) => <li key={datum}>{datum}</li>)
          : "still loading . . ."}
      </ul>
    </div>
  );
};

export default Mock;
