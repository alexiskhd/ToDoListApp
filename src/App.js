import './App.css';
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Todo from './Todo';

import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([]);

  // Create
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('entrer une ToDo valide');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });

    setInput('');
  };

  // Read
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);

  // update

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <Card className="card">
      <h2 className="title">titre ToDoList</h2>
      <div className="header_card">
        <form onSubmit={createTodo} className="form_todo">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="add todo"
            className="input_todo"
          />
          <button className="btn">{<PlusOutlined />}</button>
        </form>
      </div>
      <Form>
        <ul className="todo_ul">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </Form>
      {todos.length < 1 ? null : (
        <p className="count_todo">{`you have ${todos.length} todos`}</p>
      )}
    </Card>
  );
}

export default App;
