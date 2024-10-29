"use client"

import { useState, useEffect } from 'react'
import { Trash2, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "next-themes"

interface Todo {
  id: number
  text: string
  completed: boolean
  dueDate: Date
}

function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">TODO APP</span>
          </a>
          <nav className="flex gap-6">
            <a
              href="#"
              className="flex items-center text-sm font-medium text-muted-foreground"
            >
              Home
            </a>
            <a
              href="#"
              className="flex items-center text-sm font-medium text-muted-foreground"
            >
              About
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch('/api/todos')
    const fetchedTodos = await response.json()
    setTodos(fetchedTodos)
  }

  const addTodo = async () => {
    if (newTodo.trim()) {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo })
      })
      const newTodoItem = await response.json()
      setTodos([...todos, newTodoItem])
      setNewTodo('')
    }
  }

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, { method: 'DELETE' })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !todo.completed })
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(t => t.id === id ? updatedTodo : t))
    }
  }

  const getTimeLeft = (dueDate: Date) => {
    const now = new Date()
    const diff = new Date(dueDate).getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return `${days}d ${hours}h left`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="w-full max-w-md mx-auto">
          <div className="p-4 text-lg font-bold flex justify-between items-center bg-green-200 dark:bg-red-500">
            <span>TODO</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:text-gray-200"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
          <div className="bg-card p-4 shadow-md">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">{getTimeLeft(todo.dueDate)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex">
              <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="ここにTodoを入力"
                className="flex-grow mr-2"
              />
              <Button onClick={addTodo} className="bg-primary text-primary-foreground">
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
