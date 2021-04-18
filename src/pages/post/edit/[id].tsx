import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const UpdatePost = ({}) => {
  const [, updatePostMutation] = useUpdatePostMutation();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { id: intId },
  });

  if (fetching) {
    <Layout variant="regular">Loading....</Layout>;
  }

  if (!data?.post) {
    return <Layout variant="regular">Could not find the post</Layout>;
  } else {
    return (
      <Layout variant="small">
        <Formik
          initialValues={{ title: data.post.title, text: data?.post?.text }}
          onSubmit={async (values) => {
            await updatePostMutation({ id: intId, ...values });
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="Title" label="Title" />
              <Box mt={4}>
                <InputField
                  name="text"
                  placeholder="Text..."
                  label="Text"
                  textarea
                />
              </Box>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                bgColor="teal"
                color="white"
              >
                Update Post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
