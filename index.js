import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = 3000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.get("/", (req, res) => taskController.getAllTasks(req, res));
app.get("/add", (req, res) => taskController.getAddTaskForm(req, res));
app.post("/add", (req, res) => taskController.addTask(req, res));
app.get("/edit/:id", (req, res) => taskController.getEditTaskForm(req, res));
app.post("/edit/:id", (req, res) => taskController.editTask(req, res));
app.get("/complete/:id", (req, res) => taskController.completeTask(req, res));
app.get("/uncomplete/:id", (req, res) =>
  taskController.uncompleteTask(req, res)
);
app.get("/delete/:id", (req, res) => taskController.deleteTask(req, res));
app.use((req, res) => {
  errorController.error404(req, res);
});

app.listen(PORT, "localhost", () =>
  console.log(`Running on http://localhost:${PORT}`)
);
