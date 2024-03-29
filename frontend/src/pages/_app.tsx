import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID!}
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
