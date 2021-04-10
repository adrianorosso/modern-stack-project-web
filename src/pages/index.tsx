import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Post, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout variant="small">
      <NextLink href="/create-post">create post</NextLink>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Posts:</div>
          {data.posts.map((p: Post) => (
            <div key={p.id}>{p.title}</div>
          ))}
        </div>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
