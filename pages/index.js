import React, { useState } from "react";

import useSWR, { mutate } from "swr";

import Head from "next/head";
// import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar";

import {
  Box,
  Container,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Link,
  Code,
} from "@chakra-ui/layout";

import { useSession } from "next-auth/client";

import fetch from "isomorphic-unfetch";

const api_fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

//
// in keeping w swr/examples/optimistic-ui/
//

const Home = () => {
  const [text, setText] = useState("");

  const [session] = useSession();

  const { data } = useSWR("/api/faketest/textdata", api_fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update local data, but do not revalidate
    mutate("/api/faketest/textdata", [...data, text], false);

    // trigger a refetch
    mutate(
      "/api/faketest/textdata",
      await api_fetcher("/api/faketest/textdata", {
        method: "POST",
        body: JSON.stringify({ text }),
      })
    );

    setText("");
  };

  if (!data) return <h2>Loading . . .</h2>;

  return (
    <>
      <Navbar session={session} />
      <Box textAlign="center">
        Welcome{" "}
        <Code colorScheme="red" p="1" m="1">
          Home
        </Code>
        !<br />
        Use the navbar as a guide.
      </Box>
    </>
  );
};

export default Home;
