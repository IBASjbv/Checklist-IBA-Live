moment.locale("pt-br");

const checklist = document.getElementById("checklist");
const alertarAs = document.getElementById("alertarAs");
const btnPararAlerta = document.getElementById("btnPararAlerta");
const selecionarTodos = [...document.getElementsByClassName("select-input")];
const selecionarTodosOsMinimizers = [
  ...document.getElementsByClassName("minimizerMaximizer"),
];

let displayTimer;
let alertaRemovido = false;
let notificationDisplayed = false;

const infoCulto = () => {
  const day = moment().day();
  const today = moment().format("DD/MM/YYYY");

  if (day == 0 || day == 3) return `Culto da Família - ${today}`;

  if (day == 1) return `Culto das Mulheres - ${today}`;

  if (day == 6) return `Culto dos Jovens - ${today}`;

  return "Sem Culto";
};

const privacidadeCulto = () => {
  const day = moment().day();

  return day == 1 ? "Não Listado" : "Público";
};

const configInicial = {
  id: "ConfigInicial",
  todo: [
    { title: "Ligar Projetor" },
    { title: "Ligar TV" },
    { title: "Ligar câmera " },
    { title: "Verificar conexão com internet" },
    { title: "Abrir Holyrics" },
    { title: "Abrir OBS" },
  ],
};

const prepararOBS = {
  id: "PrepararOBS",
  todo: [
    {
      title:
        "Checar se som chega no OBS (verificar captura de  entrada de audio no painel 'Mixer de áudio')",
    },
    { title: "Projetar tela do OBS" },
    { title: "Atualizar cache do Holyrics Biblia" },
    { title: "Atualizar cache do Holyrics Louvor" },
    { title: "Atualizar cache de Holyrics Imagem" },
  ],
};

const prepararHolyrics = {
  id: "PrepararHolyrics",
  todo: [
    { title: "Pegar versículos no grupo 'Sermão e Flyers' do Whatsapp" },
    {
      title:
        "Louvores (Caso não tenha o louvor, pesquisar com Ctrl + Shift + H)",
    },
    { title: "Deixar louvores com até 2 linhas por verso" },
    { title: "Checar se louvor é exibido" },
    { title: "Verificar se flyers estão no holyrics para o dia de hoje" },
  ],
};

const prepararTransmissaoYt = {
  id: "PrepararTransmissaoYt",
  todo: [
    { title: "Abrir página da transmissão do Youtube" },
    { title: "Adicionar título: " + infoCulto() },
    { title: "Atualizar thumbnail com base no dia da semana" },
    {
      title:
        "Visibilidade - " +
        privacidadeCulto() +
        " \n (usar público apenas para os cultos de quarta e domingo à noite)",
    },
  ],
};

const minutos5 = {
  id: "CincoMinutos",
  todo: [
    { title: "Posicionar câmera em quem dará abertura" },
    { title: "Mudar para cena 'Início' para iniciar a contagem regressiva" },
    { title: "Iniciar Transmissão no OBS" },
    { title: "Verificar se transmissão iniciou" },
    { title: "Divulgar link da transmissão" },
  ],
};

const abertura = {
  id: "Abertura",
  todo: [
    { title: "Exibir o nome do pregador por 30s" },
    { title: "Verificar qualidade da transmissão" },
  ],
};

const dizimo = {
  id: "Dizimo",
  todo: [
    { title: "Ao iniciar louvor, exibir dados bancários" },
    { title: "Após oração, remover dados bancários" },
  ],
};

const duranteCulto = {
  id: "duranteCulto",
  todo: [{ title: "Rodar banner de 'Redes Sociais' no OBS" }],
};

const encerrarTransmissao = {
  id: "EncerrarTransmissao",
  todo: [
    { title: "Mudar para a cena final" },
    { title: "Desvanecer para preto" },
    { title: "Interromper transmissão no OBS" },
    { title: "Encerrar transmissão no Youtube" },
    { title: "Desligar câmera" },
    { title: "Remover versículos do favoritos" },
    { title: "Fechar Holyrics" },
    { title: "Fechar OBS" },
    { title: "Fechar Youtube" },
  ],
};

const todos = [
  configInicial,
  prepararOBS,
  prepararHolyrics,
  prepararTransmissaoYt,
  minutos5,
  abertura,
  dizimo,
  duranteCulto,
  encerrarTransmissao,
];

todos.forEach((item) => renderizarItemDoChecklist(item));

selecionarTodos.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkbox.checked
      ? selecionarOuLimparTodosDoGrupo(checkbox, true)
      : selecionarOuLimparTodosDoGrupo(checkbox, false);
  });
});

btnPararAlerta.addEventListener("click", () => {
  pararAlerta();
});

alertarAs.addEventListener("change", function () {
  alertaRemovido = false;
  checklist.classList.remove("alert-hour");
});

displayTimer = setInterval(() => {
  hoje.innerHTML = moment().format("LL");
  timer.innerHTML = moment().format("HH:mm:ss");
  verificarEAplicarAlerta();
}, 100);

function renderizarItemDoChecklist(obj) {
  const element = document.getElementById(obj.id);

  obj.todo.forEach(
    (item) =>
      (element.innerHTML += `
        <div class="form-check check-all">
            	<label class="form-check-label">
            		<input class="form-check-input" type="checkbox">  
            		${item.title}
        	</label>
        </div>`)
  );
}

function verificarEAplicarAlerta() {
  const horarioAtual = moment().format("HH:mm:ss");
  const horarioDoAlerta = alertarAs.value;

  if (horarioDoAlerta == "") return false;

  if (horarioAtual >= horarioDoAlerta) {
    return aplicarAlerta();
  }
}

function aplicarAlerta() {
  if (!alertaRemovido) {
    if (!notificationDisplayed) {
      mostrarNotificacao();
      notificationDisplayed = true;
    }
  }

  if (!alertaRemovido) {
    checklist.classList.add("alert-hour");
  }
}

function pararAlerta() {
  alertaRemovido = true;
  checklist.classList.remove("alert-hour");
  notificationDisplayed = false;
}

function selecionarOuLimparTodosDoGrupo(e, value) {
  const target = e.dataset.target;
  const elements = document.querySelectorAll(
    `#${target} input[type="checkbox"]`
  );

  elements.forEach((checkbox) => {
    checkbox.checked = value;
  });

  minimizarOuMaximizarTodosDoGrupo(e, value);
}

function minimizarOuMaximizarTodosDoGrupo(target, isChecked) {
  const form = document.getElementById(target.dataset.target);

  return isChecked
    ? form.classList.add("hide-checkbox")
    : form.classList.remove("hide-checkbox");
}
