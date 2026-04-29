const input = document.getElementById("task-input")
const addbutton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")

// CRIA UMA TAREFA (função principal)
function createTask(taskText, isDone = false) {
  const li = document.createElement("li")

  const span = document.createElement("span")
  span.innerText = taskText

  if (isDone) {
    span.classList.add("done")
  }

  span.addEventListener("click", function () {
    span.classList.toggle("done")
    saveTasks()
  })

  const deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete"

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation()
    li.remove()
    saveTasks()
  })

  li.appendChild(span)
  li.appendChild(deleteButton)
  taskList.appendChild(li)
}

// SALVA NO LOCALSTORAGE
function saveTasks() {
  const tasks = []

  document.querySelectorAll("#task-list li span").forEach(function (span) {
    tasks.push({
      text: span.innerText,
      done: span.classList.contains("done"),
    })
  })

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// CARREGA QUANDO ABRE A PÁGINA
function loadTasks() {
  const saved = localStorage.getItem("tasks")
  if (!saved) return

  const tasks = JSON.parse(saved)

  tasks.forEach(function (task) {
    createTask(task.text, task.done)
  })
}

// BOTÃO ADICIONAR
addbutton.addEventListener("click", function () {
  if (input.value.trim() === "") return

  createTask(input.value)
  saveTasks()
  input.value = ""
})

// INICIA A LISTA AO ABRIR
loadTasks()
