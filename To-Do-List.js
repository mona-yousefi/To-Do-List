// mock data

const tasks = [
  { id: 1, name: "Buy clothes", category: "shopping", completed: false },
  { id: 2, name: "Finish project", category: "work", completed: true },
  { id: 3, name: "Clean my room", category: "home", completed: true },
  { id: 4, name: "Call friends", category: "personal", completed: false },
  {
    id: 5,
    name: "learning javascript",
    category: "personal",
    completed: false,
  },
];

const table = document.getElementById("table-body");
const selectCategory = document.getElementById("select-category");
const taskInput = document.getElementById("task-input");
const add = document.getElementById("add");
const filterCategory = document.getElementById("filter-category");
const filter = document.getElementById("filter");
const search = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const displayTask = (taskArray) => {
  table.innerHTML = "";
  taskArray.forEach((task) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    const name = id.cloneNode();
    const category = id.cloneNode();
    const completed = id.cloneNode();

    id.textContent = task.id;
    name.textContent = task.name;
    category.textContent = task.category;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("click", () => {
      task.completed = !task.completed;
      displayTask(tasks);
    });
    console.log(task);
    completed.appendChild(checkbox);
    if (task.completed) {
      name.style.textDecoration = "line-through";
    }
    tr.append(id, name, category, completed);
    table.appendChild(tr);
  });
};
// convert to object to have unique categories =>
const initialCategories = () => {
  const categoryObj = { all: null };
  tasks.forEach((item) => {
    Object.assign(categoryObj, { [item.category]: null });
  });

  for (const key in categoryObj) {
    const option = document.createElement("option");
    option.textContent = key;
    if (key !== "all") {
      selectCategory.appendChild(option);
    }
    filterCategory.appendChild(option.cloneNode(true));
  }
  console.log(categoryObj);
};
//

const initialize = () => {
  initialCategories();
  displayTask(tasks);
};

const addNewTask = () => {
  const taskName = taskInput.value;
  if (!taskName) {
    return alert("you must input something");
  }
  const newTask = {
    id: tasks.length + 1,
    name: taskInput.value,
    category: selectCategory.value,
    completed: false,
  };
  tasks.push(newTask);
  displayTask(tasks);
  taskInput.value = "";
};

add.addEventListener("click", addNewTask);

const filterTasks = () => {
  const selectedCategory = filterCategory.value;
  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === "all") return task;
    return task.category === selectedCategory;
  });
  displayTask(filteredTasks);
};

filter.addEventListener("click", filterTasks);

const searchTasks = () => {
  const filtered = tasks.filter((task) => {
    return task.name
      .toLocaleLowerCase()
      .includes(searchInput.value.trim().toLocaleLowerCase());
  });
  displayTask(filtered);
};
search.addEventListener("click", searchTasks);
window.onload = initialize;

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const body = document.querySelector("body");

const colorHandler = () => {
  body.style.background = `linear-gradient(to right,${color1.value},${color2.value})`;
};
color1.addEventListener("input", colorHandler);
color2.addEventListener("input", colorHandler);
