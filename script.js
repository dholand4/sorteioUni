const premios = [
    { tipo: "Agenda", quantidade: 10 },
    { tipo: "Bombom", quantidade: 50 }
];

// Recuperar prêmios sorteados do Local Storage
let sorteados = JSON.parse(localStorage.getItem("sorteados")) || [];
let contador = sorteados.length + 1; // Começar a contagem a partir do próximo número

// Atualizar a lista de prêmios sorteados na interface
function carregarNumerosSorteados() {
    const container = document.getElementById("numerosSorteados");
    container.innerHTML = ""; // Limpar a lista atual
    sorteados.forEach((premio) => {
        const span = document.createElement("span");
        span.textContent = premio;
        span.classList.add("sorteado");
        container.appendChild(span);
    });
}

// Função para sortear prêmio com probabilidades
function sortearNumero() {
    if (sorteados.length === 60) { // Limita o número total de prêmios sorteados
        alert("Todos os prêmios já foram sorteados!");
        return;
    }

    // Animação de "carregando" enquanto sorteia
    const premioEl = document.getElementById("premio");
    premioEl.textContent = "🎉 Sorteando 🎉";
    premioEl.style.animation = "destaque 0.8s ease infinite";

    setTimeout(() => {
        let premio = "Sem prêmio";
        let tentativa = 0;

        while (tentativa < 3) { // Tentar sortear até 3 vezes, caso o prêmio não esteja disponível
            const random = Math.random();

            // Probabilidades: 70% Bombom, 15% Agenda
            if (random < 0.90) {
                premio = "Bombom"; // 90%
            } else if (random < 1) {
                premio = "Agenda"; // 10%
            } else {
                premio = "Sem prêmio"; // Restante
            }

            // Verificar a disponibilidade do prêmio
            const premioIndex = premios.findIndex(p => p.tipo === premio);
            if (premioIndex !== -1 && premios[premioIndex].quantidade > 0) {
                premios[premioIndex].quantidade--;
                break;
            } else {
                premio = "Sem prêmio";
            }

            tentativa++;
        }

        if (premio === "Sem prêmio" && premios.every(p => p.quantidade === 0)) {
            alert("Todos os prêmios acabaram!");
        }

        // Atualizar exibição
        premioEl.style.animation = "";
        premioEl.textContent = premio;

        // Salvar e exibir o prêmio sorteado
        sorteados.unshift(`${contador} - ${premio}`); // Adiciona no começo da lista com o número do sorteio
        localStorage.setItem("sorteados", JSON.stringify(sorteados));
        contador++; // Incrementar o número para o próximo sorteio
        carregarNumerosSorteados(); // Atualiza a lista de sorteados
    }, 1000);
}

// Função para limpar o sorteio
function limparSorteio() {
    sorteados = [];
    localStorage.removeItem("sorteados");

    // Resetar o contador
    contador = 1;

    // Atualizar a interface
    const premioEl = document.getElementById("premio");
    premioEl.textContent = "";

    carregarNumerosSorteados(); // Atualiza a lista de sorteados
}

// Carregar a lista inicial ao abrir a página
carregarNumerosSorteados();

// Adicionar evento ao botão de sorteio
document.getElementById("sortearBtn").addEventListener("click", sortearNumero);

// Adicionar evento ao botão de limpar
document.getElementById("limparBtn").addEventListener("click", limparSorteio);
