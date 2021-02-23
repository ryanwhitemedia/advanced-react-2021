import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage() {
  const router = useRouter();
  const query = router.query;

  return (
    <div>
      <p>Sell</p>
      <UpdateProduct id={query.id} />
    </div>
  );
}
