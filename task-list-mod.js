const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function showTasks() {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      console.log('La lista de tareas está vacía.');
    } else {
      console.log('Lista de tareas:');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.description}`);
      });
    }
    resolve();
  });
}

function addTask(description) {
  return new Promise((resolve, reject) => {
    tasks.push({ description, completed: false });
    console.log('Tarea agregada.');
    resolve();
  });
}

function removeTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      console.log('Tarea eliminada.');
    } else {
      console.log('Índice de tarea no válido.');
    }
    resolve();
  });
}

function completeTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      console.log('Tarea marcada como completada.');
    } else {
      console.log('Índice de tarea no válido.');
    }
    resolve();
  });
}

async function menu() {
  console.log('\nOpciones:');
  console.log('1. Mostrar lista de tareas');
  console.log('2. Agregar tarea');
  console.log('3. Eliminar tarea');
  console.log('4. Marcar tarea como completada');
  console.log('5. Salir');

  const option = await new Promise((resolve) => {
    rl.question('Seleccione una opción: ', (input) => {
      resolve(input);
    });
  });

  switch (option) {
    case '1':
      await showTasks();
      break;
    case '2':
      const description = await new Promise((resolve) => {
        rl.question('Ingrese la descripción de la tarea: ', (input) => {
          resolve(input);
        });
      });
      await addTask(description);
      break;
    case '3':
      const indexToRemove = await new Promise((resolve) => {
        rl.question('Ingrese el índice de la tarea a eliminar: ', (input) => {
          resolve(parseInt(input) - 1);
        });
      });
      await removeTask(indexToRemove);
      break;
    case '4':
      const indexToComplete = await new Promise((resolve) => {
        rl.question('Ingrese el índice de la tarea a marcar como completada: ', (input) => {
          resolve(parseInt(input) - 1);
        });
      });
      await completeTask(indexToComplete);
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Opción no válida.');
      await menu();
      break;
  }
}

menu();
