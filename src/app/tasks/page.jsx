/* 'use client';
import { useState, useEffect } from 'react'; */

import axios from 'axios';
import DeleteTask from '../components/DeleteTask';

async function getTasks() {
	const res = await fetch('http://localhost:3000/api/tasks', {
		cache: 'no-store',
	});
	const tasks = await res.json();
	return tasks;
}

export default async function TaskList() {
	/* const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getTasks = async () => {
			try {
				const res = await axios.get('/api/tasks');
				setTasks([...res.data]);
			} catch (e) {
				console.error('Error fetching tasks: ', error);
			} finally {
				setLoading(false);
			}
		};

		getTasks();
	}, []); */

	//const { data } = await axios.get('/api/tasks');
	const tasks = await getTasks();

	const parsePriority = priority => {
		if (priority === '1') return 'Medium';
		else if (priority === '2') return 'Hard';
		else return 'Low';
	};

	return (
		<table className="text-gray-900 dark:text-gray-300 w-full">
			<thead>
				<tr>
					<th>Task</th>
					<th>Description</th>
					<th>Priority</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					/* !loading && */
					tasks.map(task => (
						<tr key={task.id}>
							<td>{task.name}</td>
							<td>{task.description}</td>
							<td>{parsePriority(task.priority)}</td>
							<td className="text-center">
								<DeleteTask />
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	);
}
