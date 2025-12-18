const API = "http://127.0.0.1:3000/municipios";

const CLIENT_API_KEY = "SUA_CHAVE_SECRETA_MUITO_FORTE_123456";

//globais

let limite = 3;
let offset = 0;
let lastScrollTop = 0

//ligacao com html

const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");
const btnAtualizar = document.getElementById("btnAtualizar");
const btnCancelar = document.getElementById("btnCancelar");
const btnAdicionar = document.getElementById("btnadd");
const btnMenos = document.getElementById("btnmenos");

//events

btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);
btnAtualizar.addEventListener("click", salvarAtualizacao);
btnCancelar.addEventListener("click", cancelarEdicao);
btnAdicionar.addEventListener("click", carregarmais);
btnMenos.addEventListener("click", carregarmenos);

window.addEventListener("scroll", async () => {
    let scrollTop = window.pageYOffset;

    carregarmais();

    if (scrollTop > lastScrollTop) {
        carregarmenos();

    } else {
        console.log("Rolei para cima!!!")
    }

    lastScrollTop = lastScrollTop

});

//funcoes

async function todoscarregar() {
    try {
        const url = `${API}/?limit=${limite}&offset=${offset}`;

        const resposta = await fetch(url, {
            headers: {
                'minha-chave': CLIENT_API_KEY
            }
        });

        const dados = await resposta.json();

        listagem.innerHTML = "";
        dados.forEach(m => criarCard(m));

    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

async function carregarMunicipios() {
    limite = 3;
    offset = 0;
    todoscarregar();
}

async function carregarmais() {
    offset = offset + 3;
    todoscarregar();
}

async function carregarmenos() {
    offset = Math.max(0, offset - 3); // evita offset negativo
    todoscarregar();
}

function criarCard(m) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${m.nome} (${m.estado})</h3>
        <p>${m.caracteristica}</p>

        <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
        <button class="btn-atualizar" onclick="abrirEdicao(${m.id}, '${m.nome}', '${m.estado}', '${m.caracteristica}')">Atualizar</button>
    `;

    listagem.appendChild(card);
}

async function inserirMunicipio() {
    const nome = document.getElementById("campoMunicipio").value;
    const estado = document.getElementById("campoUF").value;
    const caracteristica = document.getElementById("campoCaracteristica").value;

    const novoMunicipio = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMunicipio),
        });

        if (!resposta.ok) throw new Error("Erro ao inserir!");
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function deletar(id) {
    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {
                'minha-chave': CLIENT_API_KEY
            }
        });

        if (!resposta.ok) throw new Error("Erro ao deletar o item");

        console.log("Item deletado!");
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

function abrirEdicao(id, nome, estado, caracteristica) {
    document.getElementById("campoID").value = id;
    document.getElementById("campoMunicipio").value = nome;
    document.getElementById("campoUF").value = estado;
    document.getElementById("campoCaracteristica").value = caracteristica;

    btnSalvar.style.display = "none";
    btnAtualizar.style.display = "inline-block";
    btnCancelar.style.display = "inline-block";
}

async function salvarAtualizacao() {
    const id = document.getElementById("campoID").value;

    const dadosAtualizados = {
        nome: document.getElementById("campoMunicipio").value,
        estado: document.getElementById("campoUF").value,
        caracteristica: document.getElementById("campoCaracteristica").value
    };

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                'minha-chave': CLIENT_API_KEY

            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!resposta.ok) throw new Error("Erro ao atualizar!");

        limparFormulario();
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao atualizar:", erro.message);
    }
}

function limparFormulario() {
    document.getElementById("campoID").value = "";
    document.getElementById("campoMunicipio").value = "";
    document.getElementById("campoUF").value = "";
    document.getElementById("campoCaracteristica").value = "";

    btnSalvar.style.display = "inline-block";
    btnAtualizar.style.display = "none";
    btnCancelar.style.display = "none";
}

function cancelarEdicao() {
    limparFormulario();
}
