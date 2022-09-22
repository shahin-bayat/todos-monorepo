import type { NextPage } from "next"
import { useState } from "react"
import Image from "next/image"
import { trpc } from "../utils/trpc"

const Home: NextPage = () => {
  const [todo, setTodo] = useState("")
  const context = trpc.useContext()

  const todosList = trpc.useQuery(["todos.list"])
  const addTodo = trpc.useMutation(["todos.create"], {
    onSuccess() {
      context.invalidateQueries(["todos.list"])
    },
  })

  if (todosList.isLoading)
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <Image src='/loading.svg' width={64} height={64} alt='Loading' />
      </div>
    )

  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center'>
      <input
        type='text'
        name='todo'
        value={todo}
        onChange={e => setTodo(e.target.value)}
        className='appearance-none block bg-transparent border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
      />
      <div className='py-2' />
      <button
        type='submit'
        className='bg-transparent font-semibold py-2 px-4 border border-white rounded'
        onClick={() => {
          addTodo.mutate(todo)
          setTodo("")
        }}
      >
        Add Todo
      </button>
      <div className='py-4' />
      <pre>
        {todosList.data?.todos?.map(todo => (
          <div key={todo.id}>
            {todo.label} <span>&nbsp; {String(todo.completed)}</span>
          </div>
        ))}
      </pre>
    </main>
  )
}

export default Home
