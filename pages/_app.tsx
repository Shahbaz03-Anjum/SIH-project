import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ProfileProvider } from '../components/ProfileProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />
    </ProfileProvider>
  );
}
