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
const buscarInput = document.getElementById("buscar")
const prioridades = document.getElementById("prioridades")
const vencimento = document.getElementById("vencimento")

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

  const busca = buscarInput.value.toLowerCase()

  if (busca !== "") {
    tarefasFiltradas = tarefasFiltradas.filter((tarefa) =>
      tarefa.texto.toLowerCase().includes(busca),
    )
  }

  // Filtra conforme o botão clicado
  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefasFiltradas.filter((tarefa) => !tarefa.concluida)
  }

  if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefasFiltradas.filter((tarefa) => tarefa.concluida)
  }

  const emojiPrioridades = {
    alta: "🔴",
    media: "🟡",
    baixa: "🟢",
  }

  const peso = {
    alta: 3,
    media: 2,
    baixa: 1,
  }

  tarefasFiltradas.sort((a, b) => {
    return peso[b.prioridades] - peso[a.prioridades]
  })

  tarefasFiltradas.forEach((tarefa) => {
    const li = document.createElement("li")
    li.classList.add(`prioridade-${tarefa.prioridades}`)

    const data = new Date(tarefa.data)
    const hoje = new Date()

    const dataFormatada = data.toLocaleDateString("pt-BR")
    const horaFormatada = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const dataVencimento = new Date(tarefa.vencimento)
    const vencimentoFormatado = dataVencimento.toLocaleDateString("pt-BR")

    const span = document.createElement("span")
    span.textContent = `${tarefa.texto}`

    const smallCriacao = document.createElement("small")
    smallCriacao.textContent = ` 📅 Criada: ${dataFormatada} • ${horaFormatada}`

    const smallVencimento = document.createElement("small")
    smallVencimento.textContent = ` ⏳ Vence: ${vencimentoFormatado} • ${emojiPrioridades[tarefa.prioridades]} ${tarefa.prioridades}`

    // Adiciona estilo de concluída ou atrasada
    if (tarefa.concluida) {
      span.classList.add("done")
    }

    if (hoje > dataVencimento && !tarefa.concluida) {
      li.classList.add("atrasada")
      smallVencimento.textContent += " ⚠️ ATRASADA"
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
    li.appendChild(smallCriacao)
    li.appendChild(smallVencimento)
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
    prioridades: prioridades.value,
    vencimento: vencimento.value,
    concluida: false,
    data: new Date(),
  })

  console.log(tarefas)

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

buscarInput.addEventListener("input", () => {
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
