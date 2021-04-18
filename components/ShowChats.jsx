import {
  Avatar,
  Box,
  Center,
  Container,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";

import AddAChat from "./AddAChat";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { useSession } from "next-auth/client";

const checkOwner = (cht, session) => {
  return cht.author.name === session?.user?.name;
};

const ShowChats = ({ chats }) => {
  const [session] = useSession();

  return (
    <>
      <Stack spacing={1.5}>
        {chats?.map((chat, cidx) => {
          const mine = checkOwner(chat, session);

          return (
            <Center>
              <Box
                w="70%"
                pl={mine ? "15%" : "2%"}
                pr={mine ? "2%" : "15%"}
                key={chat.id || cidx}
              >
                <Chat mine={mine} chat={chat} />
              </Box>
            </Center>
          );
        })}
        <Box>
          <AddAChat />
        </Box>
      </Stack>
    </>
  );
};

const Chat = ({ mine, chat }) => {
  const authorElem = () => (
    <Stack spacing={4} isInline alignItems="center" p={4} borderBottomWidth={1}>
      <Avatar name={chat.author?.name} src={chat.author?.image} />
      <Stack>
        <Text fontWeight="bold">{chat.author?.name}</Text>
        <Text fontSize="sm" color="gray.500">
          {dayjs(chat.createdAt).fromNow()}
        </Text>
      </Stack>
    </Stack>
  );

  const bodyElem = () => (
    <Text fontSize="md" p={4}>
      {chat.body}
    </Text>
  );

  return (
    <Box
      borderColor={mine ? "green.800" : "green.200"}
      // bg={mine ? "gray.50" : "white"}
      borderWidth={mine ? "2px" : "1px"}
      borderRadius="lg"
      borderTopLeftRadius={mine ? "lg" : 0}
      borderTopRightRadius={mine ? 0 : "lg"}
      shadow="md"
      rounded="lg"
      // p={2}
    >
      <Stack spacing={0}>
        {authorElem()}
        {bodyElem()}
      </Stack>
    </Box>
  );
};

export default ShowChats;
