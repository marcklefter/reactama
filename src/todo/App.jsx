import {
  useState
} from 'react'

import {
  useMode,
} from './hooks';

import {
  TodoForm
} from './TodoForm';

import {
  Todo
} from './Todo';

import styles from './App.module.css';

// ...

const initialTodos = require('./todos.json');

// ...

export function App() {
  const [todos, setTodos] = useState(initialTodos);

  // prepare to get the mode (= most frequently used word) in the set of all todo titles.
  const titles = todos.map(({ title }) => title);

  const mfw = useMode(titles);
  console.log('Mode: ', mfw);

  const createTodo = title => {
    setTodos([
      {
        id: Date.now(),
        completed: false,

        title
      },
      ...todos
    ]);
  };

  const deleteTodo = todoId => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const updateTodo = todoId => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }

      return todo;
    }));
  };

  return (
    <div className={styles.app}>
      <TodoForm createTodo={createTodo} />

      {todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
}
