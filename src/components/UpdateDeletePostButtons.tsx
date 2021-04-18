import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface UpdateDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const UpdateDeletePostButtons: React.FC<UpdateDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();
  const router = useRouter();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={2}
          aria-label="Update post"
          icon={<EditIcon />}
        ></IconButton>
      </NextLink>
      <IconButton
        aria-label="Delete post"
        icon={<DeleteIcon />}
        onClick={async () => {
          await deletePost({ id: id });
          router.push("/");
        }}
      ></IconButton>
    </Box>
  );
};
