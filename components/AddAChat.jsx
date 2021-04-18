import React, { useState } from "react";

import { useSession } from "next-auth/client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
  InputRightAddon,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";

const api_fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

const AddAChat = () => {
  const [chatText, setChatText] = useState("");

  const { data } = useSWR("/api/chats", api_fetcher);
  console.log(data);

  const [session] = useSession();

  const doSubmit = async (e) => {
    e.preventDefault();

    // update local data (prepend it, don't append it), but do not revalidate
    mutate(
      "/api/chats",
      [
        {
          body: chatText,
          author: { name: session.user.name, image: session.user.image },
        },
        ...data,
      ],
      false
    );

    // then, trigger a refetch ... i.e. send a request to API to update info
    await api_fetcher("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        text: chatText,
        useremail: session.user.email,
      }),
    });

    setChatText("");
  };

  return (
    <Box mt={4} p={8} shadow="lg" rounded="lg">
      <InputGroup>
        <FormControl isRequired>
          <Textarea
            id="thechat"
            value={chatText}
            rows={2}
            placeholder="What's up doc?"
            onChange={(e) => setChatText(e.target.value)}
          />
        </FormControl>
        <InputRightAddon border="none" bg="transparent" mt={2.5}>
          <Button
            loadingText="Posting . . ."
            isDisabled={!chatText.trim()} // ignore whitespace
            onClick={doSubmit}
          >
            Send !
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
};

export default AddAChat;
