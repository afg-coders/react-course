import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, LoadingOverlay } from '@mantine/core';

import { useGetUser } from '../../queries/users.query';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetUser(id);
  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return <h1>Error Occurred!</h1>;
  }

  return (
    <Container size={'xl'}>
      <Button
        variant="outline"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <h1>{data?.data?.email}</h1>
      <h1>{data?.data?.first_name}</h1>
      <h1>{data?.data?.last_name}</h1>
    </Container>
  );
}

export default UserDetail;
