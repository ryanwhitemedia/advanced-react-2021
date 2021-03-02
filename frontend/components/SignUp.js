import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: { name: inputs.name, email: inputs.email, password: inputs.password },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  }

  // const error =
  //   data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && <p>Signed Up With {data.createUser.email} - Please go Sign In</p>}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Your Name"
            value={inputs.name}
            onChange={handleChange}
            autoComplete="name"
            required
          ></input>
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={inputs.email}
            onChange={handleChange}
            autoComplete="email"
            required
          ></input>
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={inputs.password}
            placeholder="Password"
            autoComplete="password"
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
      <button type="submit">Login</button>
    </Form>
  );
}
