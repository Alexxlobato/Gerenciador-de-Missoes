let missoes = JSON.parse(localStorage.getItem("missoesDoUsuario")) || [];

// Elementos do HTML que o JavaScript vai controlar
const inputMissao = document.getElementById("missionInput");
const botaoAdicionar = document.getElementById("addMissionBtn");
const botaoSortear = document.getElementById("drawMissionsBtn");
const listaUl = document.getElementById("missionsList")

// Elementos das Estatísticas
const totalMissions = document.getElementById("totalMissions");
const completeMissions = document.getElementById("completeMissions");
const pendentMissions = document.getElementById("pendentMissions")

// Elemento do Sorteio
const drawMissionText = document.getElementById("drawMissionText")

// Função para salvar a lista de missões na gaveta "missoesDoUsuario"
function salvarNoLocalStorage() {
    try { 
        localStorage.setItem("missoesDoUsuario", JSON.stringify(missoes));
    } catch (error) { 
        console.error("Erro ao salvar no localstorage:", error)}
    }
        
// Função para adicionar uma nova missão
function adicionarMissao() {

    const missaoCapturadanoInput = inputMissao.value.trim();
    
    if (missaoCapturadanoInput === "") {
        alert("Digite uma missão para adicionar!"); 
    return;}

   
    const novaMissao = {
        nome: missaoCapturadanoInput,   
        concluida: false
        };

    missoes.push(novaMissao); // Limpa o campo de texto
    inputMissao.value = "";     

    salvarNoLocalStorage();
    atualizarLista();
      
    }

function atualizarLista() {
       
    listaUl.innerHTML = "";

    missoes.forEach(function(missao, index){
    const li = document.createElement("li");
    li.className = "missionItem";
       
    const span = document.createElement("span");
    span.className = "missionText";
    span.textContent = missao.nome;

    li.appendChild(span)
        
    if (missao.concluida) {
        span.textContent += "(✅ Concluída)";
    } else {
        span.textContent += "(☐ Pendente)";
    }
        
    listaUl.appendChild(li);
    
    }); 
} 

function concluirMissao(indice) {
    missoes[indice].concluida = !missoes[indice].concluida;
    salvarNoLocalStorage();
    atualizarLista();
}

function removerMissao(indice){
    missoes.splice (indice,1)
    salvarNoLocalStorage();
    atualizarLista();
}

