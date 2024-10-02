'use client';
import { FaTrashCan } from 'react-icons/fa6';

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
export default function DeleteTask() {
	return (
		<button
			onClick={() => deleteTask(task.id)}
			className="bg-red-600 text-white rounded p-2 hover:bg-red-700 transition duration-200"
		>
			<FaTrashCan size={18} />
		</button>
	);
}
