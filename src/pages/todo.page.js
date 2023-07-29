import {
  Alert,
  Card,
  Center,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getTodo } from "../utils/api";
import { Link } from "react-router-dom";
import { IconCheck, IconX } from "@tabler/icons-react";

function TodoPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-todo", page, limit],
    queryFn: () => getTodo(page, limit),
  });

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return (
      <Card>
        <Alert>Error Occurred</Alert>
      </Card>
    );
  }

  return (
    <div>
      <Link to={"/todo"}>Todo </Link>
      <Text size={"xl"} variant="gradient">
        Todos
      </Text>
      <Select
        label="Per page"
        placeholder="10"
        value={limit}
        onChange={setLimit}
        data={[{ value: 10 }, { value: 20 }, { value: 30 }, { value: 50 }]}
      />
      <Table striped withBorder>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((value) => {
            return (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td>
                  <Link to={`/post/${value.id}`}>More</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* 999/  10 = 100 */}
      <Center mt={"lg"}>
        <Pagination value={page} onChange={setPage} total={100 / limit} />
      </Center>
    </div>
  );
}

export default TodoPage;
