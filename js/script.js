moment.locale('pt-br')

const checklist = document.getElementById('checklist')
const alertarAs = document.getElementById('alertarAs')
const btnPararAlerta = document.getElementById('btnPararAlerta')
const selecionarTodos = [...document.getElementsByClassName('select-input')]
const selecionarTodosOsMinimizers = [...document.getElementsByClassName('minimizerMaximizer')]

let displayTimer
let alertaRemovido = false
let notifyDisplayed = false

const configInicial = {
    id: 'ConfigInicial',
    todo: [
        { title: 'Ligar Projetor' },
        { title: 'Ligar TV' },
        { title: 'Verificar conexão com internet' },
        { title: 'Abrir OBS' },
        { title: 'Abrir Holyrics' },
        { title: 'Liga câmera (conectar fonte)' },
    ]
}

const prepararOBS = {
    id: 'PrepararOBS',
    todo: [
        { title: 'Checar se som chega no OBS (ver \'Captura de Entrada de Áudio\' na seção \'Mixer de Áudio\')' },
        { title: 'Projetar tela do OBS' },
        { title: 'Atualizar cache do Holyrics Biblia' },
        { title: 'Atualizar cache do Holyrics Louvor' },
        { title: 'Atualizar cache de Holyrics Imagem' },
    ]
}

const prepararHolyrics = {
    id: 'PrepararHolyrics',
    todo: [
        { title: 'Pegar versículos' },
        { title: 'Selecionar louvores (Caso não tenha o louvor, pesquisar com Ctrl + Shift + H)' },
        { title: 'Deixar louvores com até 3 linhas' },
        { title: 'Pegar flyers/vídeos' }
    ]
}

const prepararTransmissaoYt = {
    id: 'PrepararTransmissaoYt',
    todo: [
        { title: 'Abrir aba do Youtube no Chrome' },
        { title: 'Adicionar título: ' + infoCulto().title },
        { title: 'Atualizar thumbnail (miniatura)' },
        { title: 'Privacidade: ' + infoCulto().privacity }
    ]
}

const prepararTransmissaoFb = {
    id: 'PrepararTransmissaoFb',
    todo: [
        { title: 'Abrir transmissão do Facebook' },
        { title: 'Adicionar título: ' + infoCulto().title },
        { title: 'Adicionar descrição (copiar do Youtube)' },
    ]
}

const minutos5 = {
    id: 'CincoMinutos',
    todo: [
        { title: 'Posicionar câmera em quem dará abertura' },
        { title: 'Desvanecer para preto (OBS em modo estúdio)' },
        { title: 'Iniciar Transmissão no OBS' },
        { title: 'Selecionar Cena \'Começo\' e esmaecer para iniciar o timer' },
        { title: 'Verificar se transmissão iniciou no youtube e facebook' },
        { title: 'Divulgar link da transmissão no grupo da igreja (WhatsApp)' },
    ]
}

const abertura = {
    id: 'Abertura',
    todo: [
        { title: 'Exibir o nome do pregador por 30s' },
        { title: 'Verificar qualidade da transmissão ' }
    ]
}

const dizimo = {
    id: 'Dizimo',
    todo: [
        { title: 'Ao iniciar louvor, exibir informações de dados bancários no OBS' },
        { title: 'Após oração, remover dados bancários' }
    ]
}

const duranteCulto = {
    id: 'duranteCulto',
    todo: [
        { title: 'Exibir o nome do pregador por 30s' },
        { title: 'Rodar banner de \'Redes Sociais\' no OBS' }
    ]
}

const encerrarTransmissao = {
    id: 'EncerrarTransmissao',
    todo: [
        { title: 'Desvanecer para preto' },
        { title: 'Interromper transmissão no OBS' },
        { title: 'Encerrar transmissão no Youtube' },
        { title: 'Desligar câmera e desconectar fonte' },
        { title: 'Remover versículos do favoritos' },
        { title: 'Fechar Holyrics' },
        { title: 'Fechar OBS' },
        { title: 'Fechar Youtube' }
    ]
}

const todos = [
    configInicial,
    prepararOBS,
    prepararHolyrics,
    prepararTransmissaoYt,
    prepararTransmissaoFb,
    minutos5,
    abertura,
    dizimo,
    duranteCulto,
    encerrarTransmissao
]

todos.forEach(item => renderizarItemDoChecklist(item))

selecionarTodos.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        checkbox.checked ?
            selecionarOuLimparTodosDoGrupo(checkbox, true) :
            selecionarOuLimparTodosDoGrupo(checkbox, false)
    })
})

alertarAs.setAttribute('value', infoCulto().alert_time)
verificarEAplicarAlerta()

btnPararAlerta.addEventListener('click', () => {
    pararAlerta()
})

alertarAs.addEventListener('change', function () {
    alertaRemovido = false;
    checklist.classList.remove('alert-hour')
})

displayTimer = setInterval(() => {
    hoje.innerHTML = moment().format('LL');
    timer.innerHTML = moment().format('HH:mm:ss');
    verificarEAplicarAlerta()
}, 1000)

function renderizarItemDoChecklist(obj) {
    const element = document.getElementById(obj.id);

    obj.todo.forEach(item => element.innerHTML += `
        <div class="form-check check-all">
            	<label class="form-check-label">
            		<input class="form-check-input" type="checkbox">  
            		${item.title}
        	</label>
        </div>`)
}

function verificarEAplicarAlerta() {
    const horarioAtual = moment().format('HH:mm')
    const horarioDoAlerta = alertarAs.value

    if (horarioDoAlerta == '')
        return false

    if (horarioAtual >= horarioDoAlerta)
        return aplicarAlerta()
}

function aplicarAlerta() {
    if (!notifyDisplayed)
        mostrarNotificacao()

    if (!alertaRemovido) {
        checklist.classList.add('alert-hour')
    }

    notifyDisplayed = true
}

function pararAlerta() {
    alertaRemovido = true;
    checklist.classList.remove('alert-hour')
}

function selecionarOuLimparTodosDoGrupo(e, value) {
    const target = e.dataset.target
    const elements = document.querySelectorAll(`#${target} input[type="checkbox"]`)

    elements.forEach(checkbox => {
        checkbox.checked = value
    })

    minimizarOuMaximizarTodosDoGrupo(e, value)
}

function minimizarOuMaximizarTodosDoGrupo(target, isChecked) {
    const form = document.getElementById(target.dataset.target)

    return isChecked
        ? form.classList.add('hide-checkbox')
        : form.classList.remove('hide-checkbox')
}