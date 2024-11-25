// script.js

const numeros = Array.from({ length: 120 }, (_, i) => i + 1);
const premios = [
    { tipo: "Copo", quantidade: 10 },
    { tipo: "Agenda", quantidade: 10 },
    { tipo: "Bombom", quantidade: 80 },
    { tipo: "Tente Novamente!", quantidade: 20 }
];

// Recuperar números sorteados do Local Storage
let sorteados = JSON.parse(localStorage.getItem("sorteados")) || [];

// Atualizar a lista de prêmios sorteados na interface
function carregarNumerosSorteados() {
    const container = document.getElementById("numerosSorteados");
    container.innerHTML = ""; // Limpar a lista atual
    sorteados.forEach(premio => {
        const span = document.createElement("span");
        span.textContent = premio;
        span.classList.add("sorteado");
        container.appendChild(span);
    });
}

// Função para sortear número e prêmio
function sortearNumero() {
    if (numeros.length === 0) {
        alert("Todos os prêmios já foram sorteados!");
        return;
    }

    // Animação de "carregando" enquanto sorteia
    const premioEl = document.getElementById("premio");
    premioEl.textContent = "🎉 Sorteando 🎉";
    premioEl.style.animation = "destaque 0.8s ease infinite";

    setTimeout(() => {
        // Sortear número (apenas para controle interno, sem exibição)
        const indiceNumero = Math.floor(Math.random() * numeros.length);
        numeros.splice(indiceNumero, 1); // Remove o número da lista (controle interno)

        // Sortear prêmio
        let premio = "Sem prêmio";
        const premiosDisponiveis = premios.filter(p => p.quantidade > 0);
        if (premiosDisponiveis.length > 0) {
            const indicePremio = Math.floor(Math.random() * premiosDisponiveis.length);
            premio = premiosDisponiveis[indicePremio].tipo;
            premiosDisponiveis[indicePremio].quantidade--;

            // Atualizar a lista de prêmios
            const premioIndex = premios.findIndex(p => p.tipo === premiosDisponiveis[indicePremio].tipo);
            premios[premioIndex].quantidade = premiosDisponiveis[indicePremio].quantidade;
        }

        // Atualizar exibição
        premioEl.style.animation = "";
        premioEl.textContent = premio;

        // Salvar e exibir o prêmio sorteado
        sorteados.push(premio);
        localStorage.setItem("sorteados", JSON.stringify(sorteados));
        atualizarNumerosSorteados(premio);
    }, 1000);
}

// Função para atualizar a lista na interface
function atualizarNumerosSorteados(premio) {
    const container = document.getElementById("numerosSorteados");
    const span = document.createElement("span");
    span.textContent = premio;
    span.classList.add("sorteado");
    container.appendChild(span);
}

// Carregar a lista inicial ao abrir a página
carregarNumerosSorteados();

// Adicionar evento ao botão
document.getElementById("sortearBtn").addEventListener("click", sortearNumero);
