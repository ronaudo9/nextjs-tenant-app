import ItemList from '/Users/kojimanaoyuki/src/nextjs-tenant-app/commponents/index.js';
import Link from 'next/link';
// import Head from "next/head";

function items() {
  return (
    <>
      <Link href="/items/create">
        <button>新規登録</button>
      </Link>
      <ItemList />
    </>
    // <Head>
    //   <title>商品一覧</title>
    // </Head>
  );
}
export default items;
