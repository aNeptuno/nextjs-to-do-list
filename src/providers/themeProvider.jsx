'use client';
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		setTheme(theme ?? theme);
	}, []);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add(theme);
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
