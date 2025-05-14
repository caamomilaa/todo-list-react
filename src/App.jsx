import { useState } from 'react';
import { v4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: v4(),
      name: 'No ser más teleoperadora',
      completed: false
    }
  ]); //estado para las tareas, ya que tengo que pintarlas en pantalla

  const [filterActive, setfilterActive] = useState('all');
  //estado para los filtros, porque determina qué pinto en pantalla
  const filteredTaks = filterTasks(filterActive, tasks); //Llamo a la función que filtra y va a recibir la tarea (estado) y la tarea con el filtro activo (estado). FilteredTaks, con toda la info dentro, la usaré para construir el map que pinta las tareas del todo.
  return (
    <>
      <header>
        <h1>TODO</h1>
        {/* <span>lunita</span> */}
      </header>
      <main>
        <div>
          <form onSubmit={event => createNewTask(event, tasks, setTasks)}>
            <input
              type='text'
              name='task'
              id='input-to-do'
              placeholder='Create a new todo...'
            />
          </form>
        </div>
        <div>
          {filteredTaks.map(task => (
            <div key={task.id}>
              <input
                type='checkbox'
                id={task.id}
                onChange={() => completedTask(task.id, tasks, setTasks)}
                checked={task.completed}
                // Aquí no necesito un evento, porque la funcion se disparará con un cambio, sin que necesariamente escuche directamente al evento
              />
              <label htmlFor={task.id}>{task.name}</label>
              <button onClick={() => deleteTask(task.id, tasks, setTasks)}>
                Delete
              </button>
            </div>
          ))}
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
          {/* Cuando hago click, tiene que cambiar el setFilterActive. Por lo tanto, cambio la palabra del estado de all => lo que quiera*/}
          <button onClick={() => setfilterActive('all')}>All</button>
          <button onClick={() => setfilterActive('active')}>Acive</button>
          <button onClick={() => setfilterActive('completed')}>
            Completed
          </button>
        </div>
      </main>
    </>
  );
};

const createNewTask = (event, tasks, setTasks) => {
  event.preventDefault();

  const value = event.target.task.value; //Así evito que hayan tareas vacías
  if (!value) return;

  //1. event.target es el formulario, porque es el que está disparando el evento, es el form lo que se envía. Tengo entrar dentro del valor del input.
  // ejemplo de entrada al value: children[0].value => no recomendado usar
  //ACCEDEMOS A LOS VALORES A TRAVÉS DE LOS NOMBRES QUE TENGA EL INPUT (event.target.(task).value)

  const newTask = {
    id: v4(),
    name: event.target.task.value,
    completed: false
  };

  //2.Ahora que tengo la nueva tarea,, tengo que meterlo en el array de objetos, como un objeto nuevo.
  //EVITAMOS .push, .shift ... Porque son métodos imperativos y darán problemas.

  setTasks([...tasks, newTask]); //Quiero añadir las anteriores tareas + nueva tarea. Es como un shift / append.

  event.target.reset(); //esto para qué servía?
};

const completedTask = (id, tasks, setTasks) => {
  //3.Necesito el id de la tarea, para saber cuál completar. Tasks y setTasks, para actualizar el estado.
  //4. Teniendo el id, busco la tarea en el array.
  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      //si el id del task, es igual al id
      task.completed = !task.completed; //cambio el estado del completed al contario
    }
    return task;
  });

  setTasks(updatedTasks); //Actualizo el estado para que se recargue el componente con las nuevas tareas que he buscado con el find.
};

const deleteTask = (id, tasks, setTasks) => {
  //5. Borrar la tareas es hacer un nuevo array con todas las tareas, menos la que has borrado

  const updatedTasks = tasks.filter(task => task.id !== id);
  //Quiero todas las tareas, cuyo id sea distinto al que haya mandado

  setTasks(updatedTasks); //Acutalizo de nuevo el estado
};

const filterTasks = (filter, tasks) => {
  if (filter === 'all') return tasks; //Devuelvo todas las tareas
  if (filter === 'active') return tasks.filter(task => !task.completed); //El completed a false porque si estan activas, no han sido terminadas.
  if (filter === 'completed') return tasks.filter(task => task.completed); //Tareas completadas
};
export default App;
