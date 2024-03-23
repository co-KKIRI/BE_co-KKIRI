import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

const AuthGoogleCallback = () => {
  const router = useRouter();

  const getFetch = async (code: string) => {
    const response = await axiosInstance.post(`/auth/google/redirect?code=${code}`);
  };

  const getStatus = async () => {
    const response = await axios.post(`http://localhost:8080/auth/google/status`, {
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
    });

    const { data } = response;

    console.log(data);
  };

  const getTest = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/test`, {
      withCredentials: true,
    });

    const { data } = response;

    console.log(data);
  };

  const getTest1 = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/test1`, {
      withCredentials: true,
    });

    const { data } = response;

    console.log(data);
  };

  const getAPITest = async () => {
    const response = await axios.get(`http://localhost:8080/member/info/summary`, {
      withCredentials: true,
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
      <button onClick={() => getTest()}>어스가드 테스트</button>
      <button onClick={() => getTest1()}>어스가드 테스트1</button>
      <button onClick={() => getAPITest()}>API 테스트</button>
    </>
  );
};

export default AuthGoogleCallback;
