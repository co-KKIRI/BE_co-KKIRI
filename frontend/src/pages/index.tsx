import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  const getTest = async () => {
    const response = await axios.get(`http://localhost:8080/auth/google/test`, {
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
      <Link href={'http://localhost:8080/auth/google/login'}>서버 테스트</Link>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <button onClick={() => getTest()}>쿠키 테스트</button>
    </>
  );
}
