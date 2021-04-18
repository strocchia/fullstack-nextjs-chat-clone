import React from "react";
import Head from "next/head";

import {
  Avatar,
  Box,
  Grid,
  Stack,
  Text,
  Divider,
  Container,
} from "@chakra-ui/react";

import { useSession } from "next-auth/client";

import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import Navbar from "../components/Navbar.jsx";
import ChatComponent from "../components/ShowChats.jsx";

const api_fetcher = async (...args) => {
  const gotIt = await fetch(...args);
  return gotIt.json();
};

const ChatPage = (props) => {
  // const { initialData } = props;

  const { data } = useSWR("/api/chats", api_fetcher);
  // , {
  // initialData,
  // });

  const [session] = useSession();

  if (!session) {
    return (
      <div>
        <Navbar session={session} />
        Invalid auth...
      </div>
    );
  }

  if (!data) return <h2>Loading . . .</h2>;

  return (
    <>
      <Navbar session={session} />
      <Stack spacing={4}>{/* <Box style={{ marginLeft: "2em" }}> */}</Stack>
      <ChatComponent chats={data} />
      {/* {console.log("stringified data", JSON.stringify(data, undefined, 2))} */}
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await api_fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chats`
  );

  return {
    props: { initialData: data },
  };
};

export default ChatPage;
