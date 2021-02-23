import { useRouter } from 'next/dist/client/router';

import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductPage() {
  const { query } = useRouter();
  return (
    <div>
      <p>Products</p>
      <Pagination page={query.page || 1} />
      <Products page={query.page || 1} />
      <Pagination page={query.page || 1} />
    </div>
  );
}
