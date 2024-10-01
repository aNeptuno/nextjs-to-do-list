import TaskForm from './components/TaskForm';

export default function Home() {
	return (
		<section>
			<h1 className="text-center text-2xl py-2 text-gray-900 dark:text-gray-300">
				Create new task
			</h1>
			<TaskForm />
		</section>
	);
}
