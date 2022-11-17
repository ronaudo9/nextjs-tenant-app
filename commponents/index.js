import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { useState } from 'react';
//resource, initの引数が二つなくても一つでも多分動く
const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function ItemList() {
  const router = useRouter();
  // 商品一覧をJSON Serverから取得
//   const { data, error } = useSWR('/api/items', fetcher);
   const { data, error } = useSWR('/api/items?deleted=false', fetcher)
  // エラーになった場合は一覧は表示できないのでここで終わり
  if (error) return <div>failed to load</div>;

  // データ取得が完了していないときはローディング画面
  if (!data) return <div>loading...</div>;

  // 取得したdataは Item[] なので、一行に一件ずつ表示
  const da = {};

  const deleteUser = (item) => {
    // fetch(`/api/items/${item.id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then(() => {
    //   router.reload;
    // });
    const data = {deleted:true}
    fetch(`/api/items/${item.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    router.reload()
  };
  return (
    <table  border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                {' '}
                <Link legacyBehavior href={`/items/${encodeURIComponent(item.id)}`} >
                    <a style={{color: "blue"}}>{item.id}</a>
                </Link>
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => deleteUser(item)}>削除</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//  export function getAllPostIds() {
//   const { data, error } = useSWR('/api/items', fetcher)
//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return data.map((data) => {
//     return {
//       params: {
//         id: data.id
//       }
//     };
//   });
//   }

export default ItemList;
