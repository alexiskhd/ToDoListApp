import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

export default function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={todo.completed ? 'todo_list_completed' : 'todo_list'}>
      <input
        onChange={() => toggleComplete(todo)}
        type="checkbox"
        checked={todo.completed ? 'checked' : ''}
      />
      <p
        onClick={() => toggleComplete(todo)}
        className={todo.complete ? 'todo_text_completed' : ''}
      >
        {todo.text}
      </p>
      <DeleteOutlined onClick={() => deleteTodo(todo.id)} />
    </li>
  );
}
