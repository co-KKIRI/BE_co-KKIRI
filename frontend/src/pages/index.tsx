import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Link from 'next/link';

export default function Home() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

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
    </>
  );
}
