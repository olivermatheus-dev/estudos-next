import Link from "next/link";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const { idPost } = router.query;

  return (
    <>
      <h1> Oi {idPost}</h1>
      <Link href="/">Ir para home</Link>
    </>
  );
}
