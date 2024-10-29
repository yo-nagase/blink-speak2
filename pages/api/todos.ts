import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany()
    res.status(200).json(todos)
  } else if (req.method === 'POST') {
    const { text } = req.body
    const newTodo = await prisma.todo.create({
      data: {
        text,
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
      }
    })
    res.status(201).json(newTodo)
  } else if (req.method === 'PUT') {
    const { id, completed } = req.body
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed }
    })
    res.status(200).json(updatedTodo)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.todo.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
