let missoes = JSON.parse(localStorage.getItem("missoesDoUsuario")) || [];

function adicionarMissao() {

    const missaoCapturadanoInput = document.getElementById("missionInput").value.trim();
    
    if (missaoCapturadanoInput === "") {
        alert("Digite uma missão para adicionar!"); 
    return;}

   
    const novaMissao = {
        nome: missaoCapturadanoInput,   
        concluida: false
        };

    missoes.push(novaMissao);       
    inputMissao.value = "";     
      
    }

function atualizarLista() {
       
    const lista = document.getElementById("missionsList");
    lista.innerHTML = "";

    missoes.forEach(function(missao) {
    const li = document.createElement("li");
        li.textContent = missao.nome;
        if (missao.concluida) {
            li.innerHTML += "(✅ Concluída)";
        } else {
                li.innerHTML += "(☐ Pendente)";
            }
        lista.appendChild(li);
            }

         );

    }

function salvarNoLocalStorage() {
    try { 
        localStorage.setItem("missoesDoUsuario", JSON.stringify(missoes));
    } catch (error) { 
        console.error("Erro ao salvar no localstorage:", error)}
    }
        
   

function concluirMissao() {
    const missaoClicada = document.getElementById("missionItem");
    if (missao.concluida) {

    }
    
    
}

