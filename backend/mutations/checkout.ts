import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import { products } from '../seed-data/data';
import stripeConfig from '../lib/stripe';

interface Arguments {
  token: String;
}

const graphql = String.raw;
export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1, Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw Error('Sorry! You must be signed in to create an order');
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
    id
    name
    email
    cart {
      id
      quantity
      product {
        name
        price
        description
        id
        photo {
          id
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }`,
  });
  console.dir(user, { depth: null });
  // 2. Calculate the total price for their order
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);

  // 3. Create charge with stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  // 4. Convert cartItems to orderItems
  // 5. Create the order and return it
}
