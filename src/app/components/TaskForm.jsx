'use client';
import { useState } from 'react';
import axios from 'axios';

const fieldClassName =
	'flex  justify-between items-center gap-4 flex-1 pb-5 text-gray-900 dark:text-gray-300';

const initInputs = {
	task: '',
	description: '',
	priority: '0',
};

export default function TaskForm() {
	const [formInputs, setFormInputs] = useState(initInputs);
	const [newTask, setNewTask] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		// validate input
		try {
			const response = await axios.post(
				'/api/tasks',
				JSON.stringify(formInputs)
			);

			setFormInputs(initInputs);
			setNewTask(true);
		} catch (error) {
			console.error(error);
			throw new Error('Error adding new task' + error);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormInputs({
			...formInputs,
			[name]: value,
		});
		if (newTask) setNewTask(false);
	};

	return (
		<section>
			<form
				action="/api/tasks"
				method="POST"
				onSubmit={handleSubmit}
				className="py-10 flex flex-col overflow-hidden"
			>
				<div className={fieldClassName}>
					<label htmlFor="task-name">Task name:</label>
					<input
						required
						type="text"
						name="task"
						id="task-name"
						placeholder="Buy bread..."
						className="bg-slate-300 text-gray-900 p-2 rounded w-[70%] max-w-[400px] min-w-[200px]"
						value={formInputs.task}
						onChange={handleChange}
					/>
				</div>
				<div className={fieldClassName}>
					<label htmlFor="task-description">Description:</label>
					<textarea
						value={formInputs.description}
						onChange={handleChange}
						type="text"
						name="description"
						id="task-description"
						placeholder="For breakfast I need..."
						className="bg-slate-300 text-gray-900 p-2 rounded w-[70%] max-w-[400px] min-w-[200px]"
					/>
				</div>
				<div className={fieldClassName}>
					<label htmlFor="task-priority">Priority:</label>
					<select
						value={formInputs.priority}
						onChange={handleChange}
						name="priority"
						id="task-priority"
						className="bg-slate-300 text-gray-900 p-2 rounded w-[70%] max-w-[400px] min-w-[200px]"
					>
						<option value="0">Low</option>
						<option value="1">Medium</option>
						<option value="2">High</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-slate-400 text-gray-900 rounded py-3 mt-10 mx-auto w-[200px] hover:text-white"
					aria-label="Add task"
				>
					Add
				</button>
			</form>
			{newTask && (
				<div className="text-green-600 text-center">New task created</div>
			)}
		</section>
	);
}
