import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
const DELETE_PRODUCT_MUTATION = gql`
mutation DELETE_PRODUCT_MUTATION($id: ID!){
  deleteProduct($id){
    id
    name
  }
}`;

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, { variables: { id } });
  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item>')) {
          console.log('delter');
          deleteProduct();
        }
      }}
    >
      {children}
    </button>
  );
}
