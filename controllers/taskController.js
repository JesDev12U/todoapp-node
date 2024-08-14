import errorController from "./errorController.js";

let tasks = [
  {
    id: 1,
    title: "Task1",
    completed: false,
  },
  {
    id: 2,
    title: "Task2",
    completed: true,
  },
];

const getAllTasks = (req, res) =>
  res.render("index", { title: "List of tasks", tasks });

const getAddTaskForm = (req, res) => res.render("add", { title: "Add task" });

const addTask = (req, res) => {
  let { title } = req.body;
  let id = tasks.length + 1;
  tasks.push({ id, title, completed: false });
  res.redirect("/");
};

const getEditTaskForm = (req, res) => {
  let index = parseInt(req.params.id) - 1;
  if (index > tasks.length - 1) {
    errorController.error404(req, res);
    return;
  }
  res.render("edit", {
    title: "Edit task",
    task: tasks[index],
  });
};

const editTask = (req, res) => {
  let { id } = req.params;
  let { title } = req.body;
  tasks[parseInt(id) - 1].title = title;
  res.redirect("/");
};

const completeTask = (req, res) => {
  let { id } = req.params;
  let index = parseInt(id) - 1;
  if (index > tasks.length - 1) {
    errorController.error404(req, res);
    return;
  }
  tasks[index].completed = true;
  res.redirect("/");
};

const uncompleteTask = (req, res) => {
  let { id } = req.params;
  let index = parseInt(id) - 1;
  if (index > tasks.length - 1) {
    errorController.error404(req, res);
    return;
  }
  tasks[index].completed = false;
  res.redirect("/");
};

const deleteTask = (req, res) => {
  let { id } = req.params;
  if (parseInt(id) - 1 > tasks.length - 1) {
    errorController.error404(req, res);
    return;
  }
  let index = tasks.findIndex((task) => task.id === parseInt(id));
  tasks.splice(index, 1);
  res.redirect("/");
};

export default {
  getAllTasks,
  getAddTaskForm,
  addTask,
  getEditTaskForm,
  editTask,
  completeTask,
  uncompleteTask,
  deleteTask,
};
