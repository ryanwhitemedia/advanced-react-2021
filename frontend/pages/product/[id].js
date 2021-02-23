import SingleProduct from '../../components/SingleProduct';
import { useRouter } from 'next/router';

export default function SingleProductPage() {
  const router = useRouter();
  const query = router.query;

  return <SingleProduct id={query.id} />;
}
