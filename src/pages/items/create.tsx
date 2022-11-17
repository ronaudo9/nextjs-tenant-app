import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Create() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const data = {
    name: name,
    description: description,
  };

  const Handler = (event: any) => {
    event.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      router.push('/items/');
    });
  };

  return (
    <>
      <form action="" method="post" onSubmit={Handler}>
        <div>
          <label>商品名:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>説明:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <button type="submit">登録</button>
      </form>
    </>
  );
}

export default Create;
