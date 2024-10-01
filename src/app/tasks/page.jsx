'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashCan } from 'react-icons/fa6';

export default function TaskList() {
	const [tasks, setTasks] = useState([]);
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
	}, []);

	const parsePriority = priority => {
		if (priority === '1') return 'Medium';
		else if (priority === '2') return 'Hard';
		else return 'Low';
	};

	async function deleteTask(taskId) {
		try {
			const response = await axios.delete(`/api/tasks?id=${taskId}`);
			console.log('Deleted task:', response.data);
		} catch (error) {
			console.error(
				'Error deleting task:',
				error.response?.data || error.message
			);
		}
	}

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
				{!loading &&
					tasks.map(task => (
						<tr key={task.id}>
							<td>{task.name}</td>
							<td>{task.description}</td>
							<td>{parsePriority(task.priority)}</td>
							<td className="text-center">
								<button
									onClick={() => deleteTask(task.id)}
									className="bg-red-600 text-white rounded p-2 hover:bg-red-700 transition duration-200"
								>
									<FaTrashCan size={18} />
								</button>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
