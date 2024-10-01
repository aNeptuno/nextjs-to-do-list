import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

/* import mysql from 'serverless-mysql';

const db = mysql({
	config: {
		host: 'your-database-host',
		database: 'your-database-name',
		user: 'your-database-user',
		password: 'your-database-password',
	},
}); */

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const { task, description, priority } = await request.json();

		/* 
		const result = await db.query('INSERT INTO task SET ?', {
			task,
			description,
			priority
		});
		await db.end(); */

		const newTask = await prisma.task.create({
			data: {
				name: task,
				description: description,
				priority: priority,
			},
		});

		return NextResponse.json(
			{ message: 'Task created successfully', task: newTask },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ message: 'Failed to create task', error: error.message },
			{ status: 500 }
		);
	} finally {
		prisma.$disconnect();
	}
}

export async function GET(request) {
	try {
		// serverless-mysql
		// const results = await db.query('SELECT * FROM task');
		const tasks = await prisma.task.findMany();
		return new Response(JSON.stringify(tasks), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error fetching tasks' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

export async function DELETE(request) {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	if (!id) {
		return new Response(JSON.stringify({ error: 'Task ID is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const deletedTask = await prisma.task.delete({
			where: { id: Number(id) },
		});
		return new Response(JSON.stringify(deletedTask), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error deleting task:', error);
		return new Response(JSON.stringify({ error: 'Error deleting task' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		await prisma.$disconnect();
	}
}
