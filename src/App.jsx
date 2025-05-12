import { useState } from 'react';

const App = () => {
  // const [task, setTask] = useState('');
  // const getTask =
  return (
    <>
      <header>
        <h1>TODO</h1>
        <span>lunita</span>
      </header>
      <main>
        <div>
          <form>
            <input
              type='text'
              id='input-to-do'
              placeholder='Create a new todo...'
            />
          </form>
        </div>
        <div>
          <div>
            <input type='checkbox' id='checkbox' />
            <label htmlFor='checkbox'>make a todo app</label>
          </div>
        </div>
        <section>
          {/* list-section */}
          <div>
            <span>1</span>
            <p>items left</p>
          </div>
          <div>
            <span>Remove Completed</span>
          </div>
        </section>
        <div>
          {/* filters */}
          <span>All</span>
          <span>Completed</span>
          <span>Acive</span>
        </div>
      </main>
    </>
  );
};

export default App;
