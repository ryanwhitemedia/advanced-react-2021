import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function Logout() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    signout();
  }

  return (
    <button type="button" onClick={handleSubmit}>
      Logout
    </button>
  );
}
