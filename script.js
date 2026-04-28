const existingDeletes = document.querySelectorAll(".delete-task")
existingDeletes.forEach(function (button) {
  button.addEventListener("click", function () {
    button.parentElement.remove()
  })
})

const existingSpans = document.querySelectorAll("li span")

existingSpans.forEach(function (span) {
  span.addEventListener("click", function () {
    span.classList.toggle("done")
  })
})

const input = document.getElementById("task-input")
const addbutton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")

addbutton.addEventListener("click", function () {
  const taskText = input.value

  const li = document.createElement("li")

  const span = document.createElement("span")
  span.innerText = taskText
  li.appendChild(span)

  // riscar tarefa
  span.addEventListener("click", function () {
    span.classList.toggle("done")
  })

  // botão delete
  const deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete"

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation() // impede de riscar
    li.remove()
  })

  li.appendChild(deleteButton)

  // AGORA sim vai para a lista
  taskList.appendChild(li)

  input.value = ""
})
