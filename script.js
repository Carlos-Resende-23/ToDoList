// =======================
// ELEMENTOS DO HTML
// =======================

const input = document.getElementById("task-input")
const addButton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")
const clearButton = document.getElementById("clear-done")
const contador = document.getElementById("contador")
const filtroTodas = document.getElementById("filtro-todas")
const filtroPendentes = document.getElementById("filtro-pendentes")
const filtroConcluidas = document.getElementById("filtro-concluidas")

// =======================
// DADOS
// =======================

let tarefas = []
let filtroAtual = "todas"

// =======================
// MOSTRAR TAREFAS
// =======================

function mostrarTarefas() {
  taskList.innerHTML = ""

  const total = tarefas.length

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length

  contador.textContent = `Total: ${total} | Pendentes: ${pendentes} | Concluídas: ${concluidas}`

  let tarefasFiltradas = tarefas

  // Filtra conforme o botão clicado
  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter((tarefa) => !tarefa.concluida)
  }

  if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefas.filter((tarefa) => tarefa.concluida)
  }

  tarefasFiltradas.forEach((tarefa) => {
    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = tarefa.texto

    // Adiciona estilo de concluída
    if (tarefa.concluida) {
      span.classList.add("done")
    }

    // Marcar como concluída
    span.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida
      salvarNoStorage()
      mostrarTarefas()
    })

    // Editar tarefa
    span.addEventListener("dblclick", () => {
      editarTarefa(tarefa)
    })

    // Container dos botões
    const divBotoes = document.createElement("div")

    // Botão editar
    const btnEditar = document.createElement("button")
    btnEditar.textContent = "Editar"

    btnEditar.addEventListener("click", () => {
      editarTarefa(tarefa)
    })

    // Botão deletar
    const btnDelete = document.createElement("button")
    btnDelete.textContent = "Delete"

    btnDelete.addEventListener("click", () => {
      deletarTarefa(tarefa)
    })

    divBotoes.appendChild(btnEditar)
    divBotoes.appendChild(btnDelete)

    li.appendChild(span)
    li.appendChild(divBotoes)

    taskList.appendChild(li)
  })
}

function atualizarFiltroAtivo() {
  filtroTodas.classList.remove("filtro-ativo")
  filtroPendentes.classList.remove("filtro-ativo")
  filtroConcluidas.classList.remove("filtro-ativo")

  if (filtroAtual === "todas") {
    filtroTodas.classList.add("filtro-ativo")
  }

  if (filtroAtual === "pendentes") {
    filtroPendentes.classList.add("filtro-ativo")
  }

  if (filtroAtual === "concluidas") {
    filtroConcluidas.classList.add("filtro-ativo")
  }
}

// =======================
// ADICIONAR TAREFA
// =======================

addButton.addEventListener("click", () => {
  if (input.value.trim() === "") return

  tarefas.push({
    texto: input.value,
    concluida: false,
  })

  salvarNoStorage()
  mostrarTarefas()

  input.value = ""
})

// =======================
// EDITAR
// =======================

function editarTarefa(tarefa) {
  const novoTexto = prompt("Editar tarefa:", tarefa.texto)

  if (novoTexto === null || novoTexto.trim() === "") {
    return
  }

  tarefa.texto = novoTexto

  salvarNoStorage()
  mostrarTarefas()
}

// =======================
// DELETAR
// =======================

function deletarTarefa(tarefa) {
  tarefas = tarefas.filter((t) => t !== tarefa)

  salvarNoStorage()
  mostrarTarefas()
}

// =======================
// LIMPAR CONCLUÍDAS
// =======================

clearButton.addEventListener("click", () => {
  tarefas = tarefas.filter((tarefa) => !tarefa.concluida)

  salvarNoStorage()
  mostrarTarefas()
})

// =======================
// FILTROS
// =======================

filtroTodas.addEventListener("click", () => {
  filtroAtual = "todas"
  atualizarFiltroAtivo()
  mostrarTarefas()
})

filtroPendentes.addEventListener("click", () => {
  filtroAtual = "pendentes"
  atualizarFiltroAtivo()
  mostrarTarefas()
})

filtroConcluidas.addEventListener("click", () => {
  filtroAtual = "concluidas"
  atualizarFiltroAtivo()
  mostrarTarefas()
})

// =======================
// LOCAL STORAGE
// =======================

function salvarNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

// =======================
// INICIALIZAÇÃO
// =======================

tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

atualizarFiltroAtivo()
mostrarTarefas()
