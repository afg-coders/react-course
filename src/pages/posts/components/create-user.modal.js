import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import React, { Fragment, useState } from 'react';
import { useCreateUser } from '../../../queries/users.query';

function CreateUserModal({ opened, close }) {
  const { mutate, isLoading } = useCreateUser();
  const [data, setData] = useState([
    { name: '', password: '', email: '', role: '' },
  ]);

  const addNewRow = () => {
    setData([...data, { name: '', password: '', email: '', role: '' }]);
  };

  const addValue = (field, value, index) => {
    const updateusers = [...data];
    updateusers[index][field] = value;
    setData(updateusers);
  };

  const onCreate = () => {
    mutate(data);
    console.log(data);
  };
  return (
    <Modal size={'xl'} opened={opened} onClose={close} title="Create User">
      <form>
        <Group mb={'xl'} position="right">
          <Button onClick={addNewRow} variant="outline">
            Add New Record
          </Button>
        </Group>
        {data.map((data, index) => (
          <Fragment key={index}>
            <Text>0{index}.</Text>
            <TextInput
              onChange={(e) => addValue('name', e.target.value, index)}
              value={data.name}
              label="Name"
              required
            />
            <PasswordInput
              onChange={(e) => addValue('password', e.target.value, index)}
              value={data.password}
              label="Password"
              required
            />
            <TextInput
              type="email"
              onChange={(e) => addValue('email', e.target.value, index)}
              value={data.email}
              label="Email"
              required
            />
            <Select
              label="Role"
              onChange={(e) => addValue('role', e, index)}
              defaultChecked={data.role}
              data={[
                { value: 'admin', label: 'Admin' },
                { value: 'sales-person', label: 'Sales Person' },
              ]}
              required
            />
          </Fragment>
        ))}

        <Group mt="xl" position="right">
          <Button loading={isLoading} onClick={onCreate} variant="outline">
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default CreateUserModal;
