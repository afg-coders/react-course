import {
  Alert,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { useLoginUser } from '../../queries/auth.query';

function LoginPage() {
  const { login } = useAuthStore();
  const [error, setError] = useState();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const { mutate, isLoading } = useLoginUser();
  const onSubmit = async (values) => {
    mutate(values, {
      onSuccess: (values) => {
        login({ isLoggedIn: true, token: values.token });
      },
      onError: (error) => {
        setError(error?.response?.data?.error);
      },
    });
  };
  return (
    <Container size={420} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Login
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert color="red">
            <Center>{error}</Center>
          </Alert>
        )}
        <form onSubmit={form.onSubmit((value) => onSubmit(value))}>
          <TextInput
            label="Email"
            {...form.getInputProps('email')}
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps('password')}
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button loading={isLoading} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
