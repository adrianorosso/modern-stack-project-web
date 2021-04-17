import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostsQuery, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostsQuery["posts"][0];
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >();
  const [{ fetching, operation }, vote] = useVoteMutation();
  return (
    <Flex justifyContent="center" alignItems="center" direction="column" mr={4}>
      <Box>
        <IconButton
          variant="outline"
          colorScheme={post.voteStatus === 1 ? "green" : undefined}
          aria-label="Updoot post"
          icon={<ChevronUpIcon />}
          isLoading={loadingState === "updoot-loading"}
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState("updoot-loading");
            await vote({ postId: post.id, value: 1 });
            setLoadingState("not-loading");
          }}
        />
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton
          variant="outline"
          colorScheme={post.voteStatus === -1 ? "red" : undefined}
          aria-label="Downdoot post"
          icon={<ChevronDownIcon />}
          isLoading={loadingState === "downdoot-loading"}
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState("downdoot-loading");
            await vote({ postId: post.id, value: -1 });
            setLoadingState("not-loading");
          }}
        />
      </Box>
    </Flex>
  );
};
