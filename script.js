// script.js

const premios = [
    { tipo: "Copo", quantidade: 10 },
    { tipo: "Agenda", quantidade: 10 },
    { tipo: "Bombom", quantidade: 80 }
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
    if (sorteados.length === 100) { // Limita o número total de prêmios sorteados
        alert("Todos os prêmios já foram sorteados!");
        return;
    }

    // Animação de "carregando" enquanto sorteia
    const premioEl = document.getElementById("premio");
    premioEl.textContent = "🎉 Sorteando 🎉";
    premioEl.style.animation = "destaque 0.8s ease infinite";

    setTimeout(() => {
        // Sortear prêmio com probabilidades
        let premio = "Sem prêmio";
        const random = Math.random();

        // Probabilidades: 70% Bombom, 15% Copo, 15% Agenda
        if (random < 0.70) {
            premio = "Bombom";
        } else if (random < 0.85) {
            premio = "Copo";
        } else {
            premio = "Agenda";
        }

        // Verificar a disponibilidade do prêmio
        const premioIndex = premios.findIndex(p => p.tipo === premio);
        if (premioIndex !== -1 && premios[premioIndex].quantidade > 0) {
            premios[premioIndex].quantidade--;
        } else {
            premio = "Sem prêmio";
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
    // Limpar sorteados no Local Storage e na página
    sorteados = [];
    localStorage.removeItem("sorteados");

    // Limpar todos os cookies
    limparCookies();

    // Resetar contador para 1
    contador = 1;

    // Atualizar a interface
    const premioEl = document.getElementById("premio");
    premioEl.textContent = "";

    carregarNumerosSorteados(); // Atualiza a lista de sorteados
}

// Função para limpar cookies
function limparCookies() {
    // Obter todos os cookies
    const cookies = document.cookie.split(";");

    // Expirar todos os cookies
    cookies.forEach(cookie => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

// Carregar a lista inicial ao abrir a página
carregarNumerosSorteados();

// Adicionar evento ao botão de sorteio
document.getElementById("sortearBtn").addEventListener("click", sortearNumero);

// Adicionar evento ao botão de limpar
document.getElementById("limparBtn").addEventListener("click", limparSorteio);
