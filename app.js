const input = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const deleteAll = document.querySelector(".delete-btn");
const div_ol = document.querySelector(".tasks");
const ol = document.querySelector("ol");

function createTask(id, text) {
  return {
    id,
    text,
  };
}
let tasks = [];
const getTasks = () => {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.map((task) => {
      const li = document.createElement("li");
      li.innerHTML += ` <div id="firstDiv" key="${task.id}"> 
                        <span>${task.text}</span>
                        <span>
                        <button type="button" class="btn"><i class="far fa-check-circle"></i></button>
                        <button type="button" class="btn"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn"><i class="fas fa-trash-alt"></i></button>
                        </span>
                     </div>
                    <div> ${task} </div>
  `;
      let ol = document.querySelector("ol");
      ol.appendChild(li);
      input.value = "";
    });
  } else {
    tasks = [];
  }
};

window.onload = () => getTasks();

function addTask() {
  if (!input.value) {
    alert("You should write a task to add !");
  }
  let id = Math.floor(Math.random() * 1000);
  let text = input.value;
  const newTask = createTask(id, text);
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const li = document.createElement("li");
  li.classList.add("task-item");

  li.addEventListener("mouseover", function () {
    li.style.cursor = "pointer";
    li.style.opacity = "0.8";
  });

  li.addEventListener("mouseout", function () {
    li.style.opacity = "1";
  });

  li.innerHTML += ` <div id="firstDiv"> 
                        <p>${text}</p>
                        <div>
                        <button type="button" class="btn"><i class="far fa-check-circle"></i></button>
                        <button type="button" class="btn"><i class="fas fa-edit"></i></button>
                        <button id="delete" type="button" class="btn"><i class="fas fa-trash-alt"></i></button>
                        </div>
                     </div>
  `;

  let ol = document.querySelector("ol");
  ol.appendChild(li);
  input.value = "";
}
addBtn.addEventListener("click", addTask);

input.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    input.value = "";
  }
});
ol.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-trash-alt") {
    let confirmation = confirm("Are you sure you want to delete?");
    confirmation ? event.target.closest("li").remove() : null;

    let id = event.target.closest("li").firstElementChild.getAttribute("key");
    console.log(id);
    tasks.forEach((task, index) => {
      if (task.id == id) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
  }

  if (event.target.className === "fas fa-edit") {
    event.target.setAttribute("class", "fas fa-thumbs-up");
    event.target.closest("li").firstElementChild.contentEditable = true;
    event.target.closest(
      "li"
    ).firstElementChild.children[0].style.backgroundColor = "white";
    event.target.closest("li").firstElementChild.style.width = "100%";
    event.target.parentElement.children[0].style.cursor = "initial";
  } else if (event.target.className === "fas fa-thumbs-up") {
    event.target.setAttribute("class", "fas fa-edit");
    event.target.closest("li").firstElementChild.contentEditable = false;
    event.target.closest(
      "li"
    ).firstElementChild.children[0].style.backgroundColor = "#0f53e7";
  }

  if (event.target.className === "far fa-check-circle") {
    if (event.target.closest("li").classList.contains("checked")) {
      event.target.closest("li").classList.remove("checked");
    } else {
      event.target.closest("li").classList.add("checked");
    }
  }
});

const removeTask = (trash) => {
  confirm("Are you sure you want to remove?")
    ? trash.parentElement.parentElement.parentElement.remove()
    : null;
  getTasks();
};
function deleteAllTasks() {
  var child = ol.lastElementChild;
  while (child) {
    ol.removeChild(child);
    child = ol.lastElementChild;
  }
  localStorage.setItem("tasks", []);
}
deleteAll.addEventListener("click", deleteAllTasks);
