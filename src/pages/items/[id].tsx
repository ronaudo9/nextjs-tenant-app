import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `http://localhost:8000/items/${params?.id as string}`
  );
  const user = await res.json();

  return {
    props: { user },
  };
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8000/items/');
  const users = await res.json();
  const paths = users.map((user: any) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function User({
  user,
}: {
  user: {
    id: string;
    name: string;
    description: string;
  };
}) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const data = {
    name: name,
  };

  const clickHandler = (event: any) => {
    event.preventDefault();
    fetch(`/api/items/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      router.push(`/items/`);
    });
  };

  const da = {
    description: description,
  };

  const clickHandler2 = (event: any) => {
    event.preventDefault();
    fetch(`/api/items/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(da),
    }).then(() => {
      router.push(`/items/`);
    });
  };
  return (
    <form action="" method="POST">
      <div>
        <p>{user.id}</p>
        <p>
          {user.name}&nbsp;{' '}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          &nbsp;<button onClick={clickHandler}>更新</button>
        </p>
        <p>
          {user.description}&nbsp;
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          &nbsp;<button onClick={clickHandler2}>更新</button>
        </p>
      </div>
    </form>
  );
}
