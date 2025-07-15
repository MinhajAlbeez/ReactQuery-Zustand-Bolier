import React from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import FormInput from './FormInput'

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchTodo'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/todo')
      return res.json()
    }
  })
  

  console.log('dataaaa', data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
    <FormInput/>
    <ul>
      {data?.data?.length > 0 ? (
        data.data.map((item) => <li key={item.id}>{item.title}</li>)
      ) : (
        <li>No todos found</li>
      )}
    </ul>
    </>
  )
}

export default App
