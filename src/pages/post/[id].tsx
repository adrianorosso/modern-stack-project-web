import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { UpdateDeletePostButtons } from "../../components/UpdateDeletePostButtons";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    <Layout variant="regular">Loading....</Layout>;
  }

  if (!data?.post) {
    return <Layout variant="regular">Could not find the post</Layout>;
  } else {
    return (
      <Layout variant="regular">
        <Heading mb={4}>{data?.post?.title}</Heading>
        <Text>{data?.post?.text}</Text>
        <Box mt={4}>
          <UpdateDeletePostButtons
            id={data?.post.id}
            creatorId={data?.post?.creator.id}
          />
        </Box>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
