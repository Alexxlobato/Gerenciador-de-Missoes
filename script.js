let missoes = JSON.parse(localStorage.getItem("missoesDoUsuario")) || []; 
// NOVO: Guarda qual filtro está ativo (começa mostrando "todas")
let filtroAtual = "todas"; 

// Elementos do HTML que o JavaScript vai controlar
const inputMissao = document.getElementById("missionInput"); 
const botaoAdicionar = document.getElementById("addMissionBtn"); 
const botaoSortear = document.getElementById("drawMissionsBtn"); 
const listaUl = document.getElementById("missionsList"); 

// NOVO: Elementos dos botões de Filtro
const btnFiltroTodas = document.getElementById("filterAll");
const btnFiltroPendentes = document.getElementById("filterPending");
const btnFiltroConcluidas = document.getElementById("filterCompleted");

// Elementos das Estatísticas 
const totalMissions = document.getElementById("totalMissions"); 
const completeMissions = document.getElementById("completeMissions"); 
const pendentMissions = document.getElementById("pendentMissions"); 

// Elemento do Sorteio 
const drawMissionText = document.getElementById("drawMissionText"); 

// Função para salvar a lista de missões na gaveta "missoesDoUsuario" 
function salvarNoLocalStorage() { 
    try { 
        localStorage.setItem("missoesDoUsuario", JSON.stringify(missoes)); 
    } catch (error) { 
        console.error("Erro ao salvar no localstorage:", error); 
    } 
} 

// Função para adicionar uma nova missão 
function adicionarMissao() { 
    const missaoCapturadanoInput = inputMissao.value.trim(); 
    if (missaoCapturadanoInput === "") { 
        alert("Digite uma missão para adicionar!"); 
        return; 
    } 
    const novaMissao = { nome: missaoCapturadanoInput, concluida: false }; 
    missoes.push(novaMissao); 
    
    // Limpa o campo de texto e mantém o foco
    inputMissao.value = ""; 
    if (inputMissao) inputMissao.focus();
    
    salvarNoLocalStorage(); 
    atualizarLista(); 
} 

function atualizarLista() { 
    listaUl.innerHTML = ""; 
    
    missoes.forEach(function(missao, index){ 
        // NOVO: Se o filtro for "pendentes" e a missão estiver concluída, pula ela
        if (filtroAtual === "pendentes" && missao.concluida) return;
        
        // NOVO: Se o filtro for "concluidas" e a missão estiver pendente, pula ela
        if (filtroAtual === "concluidas" && !missao.concluida) return;

        const li = document.createElement("li"); 
        li.className = "missionItem"; 
        const span = document.createElement("span"); 
        span.className = "missionText"; 
        span.textContent = missao.nome; 
        
        if (missao.concluida) { 
            span.textContent += " (✅ Concluída)"; 
        } else { 
            span.textContent += " (☐ Pendente)"; 
        } 
        li.appendChild(span); 
        
        // CRIA O BOTÃO CONCLUIR 
        const btnConcluir = document.createElement("button"); 
        btnConcluir.textContent = missao.concluida ? "Desfazer" : "Concluir"; 
        btnConcluir.onclick = function() { concluirMissao(index); }; 
        li.appendChild(btnConcluir); 
        
        // CRIA O BOTÃO EDITAR
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = function() { editarMissao(index); };
        li.appendChild(btnEditar); 
        
        // CRIA O BOTÃO EXCLUIR 
        const btnExcluir = document.createElement("button"); 
        btnExcluir.textContent = "Excluir"; 
        btnExcluir.onclick = function() { removerMissao(index); }; 
        li.appendChild(btnExcluir); 
        
        // O li é adicionado à lista dentro do forEach 
        listaUl.appendChild(li); 
    }); 
    
    // Atualiza os números do painel sempre que a lista muda 
    atualizarEstatisticas(); 
} 

function concluirMissao(indice) { 
    missoes[indice].concluida = !missoes[indice].concluida; 
    salvarNoLocalStorage(); 
    atualizarLista(); 
} 

function removerMissao(indice){ 
    const nomeDaMissao = missoes[indice].nome; 
    const usuarioConfirmou = confirm(`Tem certeza que deseja excluir a missão "${nomeDaMissao}"?`); 
    if (!usuarioConfirmou) { 
        return; 
    } 
    missoes.splice(indice, 1); 
    salvarNoLocalStorage(); 
    atualizarLista(); 
} 

function editarMissao(indice) { 
    const nomeAtual = missoes[indice].nome; 
    const novoNome = prompt("Edite o nome da missão:", nomeAtual); 
    
    if (novoNome === null || novoNome.trim() === ""){ 
        return; 
    } 
    missoes[indice].nome = novoNome.trim(); 
    salvarNoLocalStorage(); 
    atualizarLista(); 
} 

// Calcula e exibe os números na tela 
function atualizarEstatisticas() { 
    const total = missoes.length; 
    const concluidas = missoes.filter(m => m.concluida).length; 
    const pendentes = total - concluidas; 
    
    if (totalMissions) totalMissions.textContent = total; 
    if (completeMissions) completeMissions.textContent = concluidas; 
    if (pendentMissions) pendentMissions.textContent = pendentes; 
} 

// Sorteia uma missão pendente 
function sortearMissao() { 
    const pendentes = missoes.filter(m => !m.concluida); 
    if (pendentes.length === 0) { 
        if (drawMissionText) drawMissionText.textContent = "Nenhuma missão pendente para sortear!"; 
        return; 
    } 
    
    const indiceAleatorio = Math.floor(Math.random() * pendentes.length); 
    const missaoSorteada = pendentes[indiceAleatorio]; 
    
    if (drawMissionText) { 
        drawMissionText.textContent = `🎯 Missão sorteada: ${missaoSorteada.nome}`; 
    } 
} 

// NOVO: Função para mudar o tipo de filtro ativo e recarregar os itens na tela
function alterarFiltro(novoFiltro) {
    filtroAtual = novoFiltro;
    atualizarLista();
}

// Configura os eventos dos botões ao carregar a página 
if (botaoAdicionar) botaoAdicionar.onclick = adicionarMissao; 
if (botaoSortear) botaoSortear.onclick = sortearMissao; 

// NOVO: Ativa o clique de cada botão de filtro
if (btnFiltroTodas) btnFiltroTodas.onclick = function() { alterarFiltro("todas"); };
if (btnFiltroPendentes) btnFiltroPendentes.onclick = function() { alterarFiltro("pendentes"); };
if (btnFiltroConcluidas) btnFiltroConcluidas.onclick = function() { alterarFiltro("concluidas"); };

// Faz o Enter do teclado também adicionar a missão
if (inputMissao) {
    inputMissao.addEventListener("keypress", function(evento) {
        if (evento.key === "Enter") {
            adicionarMissao();
        }
    });
}

// Carrega a lista pela primeira vez ao abrir o app 
atualizarLista();
