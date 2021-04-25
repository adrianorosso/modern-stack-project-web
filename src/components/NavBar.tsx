import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  LinkBox,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  // not logged in
  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button variant="link" mr={2} fontWeight="bold" textColor="gray.900">
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button as={Link} mr={2}>
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    //logged in
    body = (
      <Flex align="center">
        <LinkBox ml="auto" mr={4}>
          <NextLink href="/create-post">
            <Button as={Link}>Create Post</Button>
          </NextLink>
        </LinkBox>
        <Button
          variant="link"
          fontWeight="bold"
          textColor="gray.900"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          Logout ({data.me.username})
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bgColor="#7eb5b0" p={4}>
      <Flex flex={1} maxW={800} m="auto" align="center">
        <NextLink href="/">
          <Link>
            <Heading>Posts</Heading>
          </Link>
        </NextLink>

        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
