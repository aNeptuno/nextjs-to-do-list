import Link from 'next/link';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProvider from '../providers/themeProvider';
import { montserrat } from './ui/fonts';
import ThemeToggler from './components/ThemeToggler';

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'To Do List Next App',
	description: 'Next and MySQL To Do List',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<ThemeProvider>
				<body
					className={`dark:bg-gray-900 text-gray-300 ${montserrat.className} ${geistMono.variable} antialiased`}
				>
					<header className="flex px-10 items-center bg-slate-600">
						<Link href="/">Home</Link>
						<Link href="/tasks" className="ml-4 mr-auto">
							Tasks
						</Link>
						<ThemeToggler />
					</header>
					<main className="px-16 py-10">{children}</main>
				</body>
			</ThemeProvider>
		</html>
	);
}
