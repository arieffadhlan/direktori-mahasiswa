import type { AppProps } from 'next/app';
import { Inter, Lexend } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  display: 'optional',
  subsets: ['latin'],
  variable: '--font-inter',
});

const lexend = Lexend({
  display: 'optional',
  subsets: ['latin'],
  variable: '--font-lexend',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
		<main className={`${inter.variable} ${lexend.variable} bg-dirma min-h-screen`}>
			<Component {...pageProps} />
		</main>
    )
}
