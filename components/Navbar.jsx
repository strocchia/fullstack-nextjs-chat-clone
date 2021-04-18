import {
  Flex,
  Box,
  Divider,
  Heading,
  Spacer,
  Button,
  Link,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import { useSession } from "next-auth/client";

import NextLink from "next/link";

const Navbar = ({}) => {
  const [session] = useSession();

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.700", "white");
  const color = useColorModeValue("white", "black");

  return (
    <>
      <Flex>
        <Box p="4">
          <Heading style={{ display: "inline-block" }} size="md">
            <Link href="/">Next-Chakra Chat App</Link>
          </Heading>
          <Button colorScheme="teal" variant="ghost" ml={10}>
            <Link
              _hover={{
                color: colorMode === "light" ? "blue" : "white",
                textDecoration: "underline",
              }}
              href="/chats"
            >
              Chats
            </Link>
          </Button>
        </Box>
        <Spacer />
        <Box px="8" py="2" ml="6" textAlign="center">
          Logged in as:
          <br />
          <strong>{session?.user?.name ?? "??"}</strong>
        </Box>
        <Box p="2">
          <Button
            bg={bg}
            width="40px"
            colorScheme={color}
            mr="4"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {!session && (
            <Button colorScheme="teal" mr="4">
              <Link href="api/auth/signin">Sign in</Link>
            </Button>
          )}
          {session && session.user && (
            <Button colorScheme="teal">
              <Link href="api/auth/signout">Sign out</Link>
            </Button>
          )}
        </Box>
      </Flex>
      <Divider mb="6" />
    </>
  );
};

export default Navbar;
