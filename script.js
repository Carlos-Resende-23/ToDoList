// PEGANDO ELEMENTOS DO HTML
const input = document.getElementById("task-input")
const addButton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")
const clearButton = document.getElementById("clear-done")

// ARRAY PRINCIPAL ONDE AS TAREFAS FICAM NA MEMÓRIA
let tarefas = []

// FUNÇÃO QUE DESENHA AS TAREFAS NA TELA
function mostrarTarefas() {
  // Limpa a lista antes de redesenhar
  taskList.innerHTML = ""

  // Para cada tarefa do array
  tarefas.forEach((tarefa, index) => {
    // Cria a linha da tarefa
    const li = document.createElement("li")

    // Cria o texto da tarefa
    const span = document.createElement("span")
    span.textContent = tarefa.texto

    // Se estiver concluída, adiciona a classe
    if (tarefa.concluida) {
      span.classList.add("done")
    }

    // Clique simples marca/desmarca como concluída
    span.addEventListener("click", () => concluirTarefa(index))

    // Duplo clique permite editar
    span.addEventListener("dblclick", () => editarTarefa(index))

    // DIV para organizar os botões
    const divBotoes = document.createElement("div")

    // BOTÃO EDITAR
    const btnEditar = document.createElement("button")
    btnEditar.textContent = "Editar"
    btnEditar.addEventListener("click", () => editarTarefa(index))

    // BOTÃO DELETAR
    const btnDelete = document.createElement("button")
    btnDelete.textContent = "Delete"
    btnDelete.addEventListener("click", () => deletarTarefa(index))

    // Coloca os botões dentro da div
    divBotoes.appendChild(btnEditar)
    divBotoes.appendChild(btnDelete)

    // Coloca tudo dentro da li
    li.appendChild(span)
    li.appendChild(divBotoes)

    // Coloca a li dentro da lista
    taskList.appendChild(li)
  })
}

// BOTÃO ADICIONAR TAREFA
addButton.addEventListener("click", () => {
  if (input.value.trim() === "") return

  // Adiciona no array
  tarefas.push({
    texto: input.value,
    concluida: false,
  })

  salvarNoStorage()
  mostrarTarefas()

  // Limpa o input
  input.value = ""
})

// MARCAR COMO CONCLUÍDA
function concluirTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida
  salvarNoStorage()
  mostrarTarefas()
}

// DELETAR TAREFA
function deletarTarefa(index) {
  tarefas.splice(index, 1)
  salvarNoStorage()
  mostrarTarefas()
}

// EDITAR TAREFA
function editarTarefa(index) {
  const novoTexto = prompt("Editar tarefa:", tarefas[index].texto)

  if (novoTexto === null || novoTexto.trim() === "") return

  tarefas[index].texto = novoTexto
  salvarNoStorage()
  mostrarTarefas()
}

// LIMPAR TODAS AS CONCLUÍDAS
clearButton.addEventListener("click", limparConcluidas)

function limparConcluidas() {
  tarefas = tarefas.filter((tarefa) => !tarefa.concluida)
  salvarNoStorage()
  mostrarTarefas()
}

// SALVAR NO LOCALSTORAGE
function salvarNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

// QUANDO ABRIR A PÁGINA, CARREGA O QUE JÁ EXISTE
tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
mostrarTarefas()
