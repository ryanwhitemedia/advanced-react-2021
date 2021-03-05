import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import checkout from './checkout';

// make fake graphql template
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkOut(token: String): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
