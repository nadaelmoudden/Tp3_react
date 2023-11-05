import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    const updateTodo = (title, id, completed) => {
        const newTodos = todos.map(todo =>
        todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodos);
        setEditTodo(null);
    }

    useEffect(() => {
        if (editTodo) {
        setInput(editTodo.title);
        } else {
        setInput('');
        }
    }, [editTodo, setInput]);

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
        setTodos([...todos, { id: uuidV4(), title: input, completed: false }]);
        setInput('');
        } else {
        updateTodo(input, editTodo.id, editTodo.completed);
        setInput('');
        setEditTodo(null);
        }
    }

    return (
        <div>
        <form onSubmit={onFormSubmit}>
            <input type="text" placeholder="Enter a todo..." className="task-input" value={input} required onChange={onInputChange} />
            <button className="button-add" type="submit">{editTodo ? 'Ok' : 'Add'}</button>
        </form>
        </div>
    );
}

export default Form;
