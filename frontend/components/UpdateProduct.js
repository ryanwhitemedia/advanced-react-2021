import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { SINGLE_ITEM_QUERY } from './SingleProduct';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const UPDATE_PRODUCT_MUTATIOON = gql`
  mutation UPDATE_PRODUCT_MUTATIOON($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;
export default function UpdateProduct({ id }) {
  // Get product
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });

  // Update product
  const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(
    UPDATE_PRODUCT_MUTATIOON
  );

  const { inputs, handleChange } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit input fields to backen
        await updateProduct({
          variables: {
            id: id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" placeholder="Name" value={inputs.name} onChange={handleChange} />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>

        {/* <button type="button" onClick={clearForm}>
      Clear Form
    </button>
    <button type="button" onClick={resetForm}>
      Reset Form
    </button> */}
      </fieldset>
    </Form>
  );
}
