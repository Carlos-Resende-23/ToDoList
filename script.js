const input = document.getElementById("task-input")
const addbutton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")

let tarefas = []

function mostrarTarefas() {
  taskList.innerHTML = ""

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li")

    li.innerHTML = `
      <span class="${tarefa.concluida ? "done" : ""}">
        ${tarefa.texto}
      </span>
      <button>delete</button>
    `

    li.querySelector("span").addEventListener("click", () => {
      concluirTarefa(index)
    })

    li.querySelector("button").addEventListener("click", () => {
      deletarTarefa(index)
    })

    taskList.appendChild(li)
  })
}

addbutton.addEventListener("click", function () {
  if (input.value.trim() === "") return

  tarefas.push({
    texto: input.value,
    concluida: false,
  })

  salvarNoStorage()
  mostrarTarefas()
  input.value = ""
})

function concluirTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida
  salvarNoStorage()
  mostrarTarefas()
}

function deletarTarefa(index) {
  tarefas.splice(index, 1)
  salvarNoStorage()
  mostrarTarefas()
}

function salvarNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
mostrarTarefas()
