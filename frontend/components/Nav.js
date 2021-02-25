import Link from 'next/link';
import Logout from './Logout';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Logout />
        </>
      )}
      {!user && <Link href="/login">Sign In</Link>}
    </NavStyles>
  );
}
