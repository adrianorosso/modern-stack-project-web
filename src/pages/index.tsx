import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Post, usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>hello world</div>
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
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
