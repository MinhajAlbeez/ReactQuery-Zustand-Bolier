import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const FormInput = () => {
  const [inputValue, setInputValue] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await fetch('http://localhost:8000/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:inputValue}),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchTodo'] })
      setInputValue('') 
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      mutation.mutate({ title: inputValue })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default FormInput
