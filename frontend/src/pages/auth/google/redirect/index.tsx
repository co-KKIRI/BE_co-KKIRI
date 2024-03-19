import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthGoogleCallback = () => {
  const router = useRouter();

  const getFetch = async (code: string) => {
    const response = await axios.get(`http://localhost:8080/auth/google/redirect?code=${code}`, {
      withCredentials: true,
    });

    const { data } = response;

    console.log(data);
  };

  const getStatus = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/status`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = response;

    console.log(data);
  };

  const getCheck = async () => {
    const response = await axios.get(`http://localhost:8080`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = response;

    console.log(data);
  };

  useEffect(() => {
    if (router.query.code) {
      getFetch(router.query.code as string);
    }
  }, [router]);

  return (
    <>
      <button onClick={() => getStatus()}>유저 상태 확인</button>
      <button onClick={() => getCheck()}>서버 체크</button>
    </>
  );
};

export default AuthGoogleCallback;
