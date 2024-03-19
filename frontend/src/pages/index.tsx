import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  const getCheck = async () => {
    const response = await axios.get(`http://localhost:8080`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const getLogin = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/login`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = response;

    console.log(data);
  };

  return (
    <>
      <button onClick={() => login()}>클라 테스트</button>
      <Link href={'http://localhost:8080/auth/google/login'}>구글 로그인</Link>
      <button onClick={() => getLogin()}>서버 테스트2</button>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <button onClick={() => getCheck()}>서버 체크</button>
    </>
  );
}
