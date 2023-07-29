import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTodo } from "../../utils/api";
import { Button, LoadingOverlay } from "@mantine/core";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-post", id],
    queryFn: () => getOneTodo(id),
  });

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return <h1>Error Occurred!</h1>;
  }
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
}

export default PostDetail;
