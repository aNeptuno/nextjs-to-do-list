'use client';

import React, { useContext } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { ThemeContext } from '@/providers/themeProvider';

export default function ThemeToggler() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<button
			onClick={toggleTheme}
			className="dark:text-white  hover:bg-slate-500 px-6 py-5"
		>
			{theme === 'light' ? <FaMoon size={20} /> : <BsSunFill size={20} />}
		</button>
	);
}
