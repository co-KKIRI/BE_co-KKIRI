import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthGoogleCallback = () => {
  const router = useRouter();

  const getFetch = async (code: string) => {
    const response = await axios.get(`http://localhost:8080/auth/google/redirect?code=${code}`);

    const { data } = response;

    console.log(data);
  };

  const getStatus = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/status`, { withCredentials: true });

    const { data } = response;

    console.log(data);
  };

  useEffect(() => {
    if (router.query.code) {
      getFetch(router.query.code as string);
      // window.location.href = `http://localhost:8080/auth/google/redirect?code=${router.query.code}`;
    }
  }, [router]);

  return (
    <>
      <button onClick={() => getStatus()}>유저 상태 확인</button>
    </>
  );
};

export default AuthGoogleCallback;
