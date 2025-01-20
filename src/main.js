import "./style.css";

const input = document.querySelector("#text_input");
const addButton = document.querySelector(".add_button");
const list = document.querySelector(".list");
let tasks = [];

function addTask(e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, done: false });
    renderTasks();
    input.value = "";

    console.log("tasks", tasks);
  }
}

function deleteTask(e) {
  if (e.target.tagName === "BUTTON" && e.target.innerText === "Delete") {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
    console.log("tasks", tasks);
  }
}
function showRandomePicture() {
  setTimeout(() => {
    const img = document.querySelector("img");
    if (img) {
      img.remove();
    }
  }, 3000);
  const links = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3R6aTlmNTNuZXZvdXkxZmIybG5uY3hiMDR5MGNtenhxb3pwaWJxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhweiVB36rAlqVCE/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjkxdHFlYmo0cWFkMm5yZzBtemFnYjdtbDdnMGI3dTlyd2l1ZWtuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VEDMx3Fpqlj4YH9EE5/giphy.gif",
  ];
  const img = document.createElement("img");
  img.src = links[Math.floor(Math.random() * links.length)];
  const app = document.querySelector("#app");
  app.appendChild(img);
}

function doneTask(e) {
  if (e.target.tagName === "BUTTON" && e.target.innerText === "Done") {
    const index = e.target.dataset.index;
    tasks[index].done = !tasks[index].done;
    renderTasks();
    showRandomePicture();
    console.log("tasks", tasks);
  }
}

const renderTasks = () => {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerText = task.text;
    li.classList.add("list_item");
    if (task.done) {
      li.classList.add("done");
    }
    list.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.dataset.index = index;
    deleteButton.innerText = "Delete";
    li.appendChild(deleteButton);

    const doneButton = document.createElement("button");
    doneButton.dataset.index = index;
    doneButton.innerText = "Done";
    li.appendChild(doneButton);
  });
};

addButton.addEventListener("click", addTask);
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Delete") {
      deleteTask(e);
    } else if (e.target.innerText === "Done") {
      doneTask(e);
    }
  }
});
