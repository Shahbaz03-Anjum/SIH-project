import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ProfileProvider } from '../components/ProfileProvider';
import { IndustryProfileProvider } from '../components/IndustryProfileProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <IndustryProfileProvider>
        <Component {...pageProps} />
      </IndustryProfileProvider>
    </ProfileProvider>
  );
}
