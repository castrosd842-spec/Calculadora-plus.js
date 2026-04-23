// ─────────────────────────────────────────
//  Calculadora Plus — funcoes.js
// ─────────────────────────────────────────

// Elementos do DOM
const displayEl    = document.getElementById('display');
const expressionEl = document.getElementById('expression');
const historicoEl  = document.getElementById('historico');

// Estado
let expressao     = '';   // expressão sendo montada
let acabouCalculo = false; // flag: acabou de calcular?
let listaHistorico = [];  // array de { expr, res }

// ─── ADICIONAR CARACTERE ───────────────────
function adicionar(val) {
  // Se acabou de calcular e digitou número → recomeça
  if (acabouCalculo && (!isNaN(val) || val === '.')) {
    expressao = '';
    acabouCalculo = false;
  }

  // Se acabou de calcular e digitou operador → continua do resultado
  if (acabouCalculo && ['+', '-', '*', '/', '%'].includes(val)) {
    acabouCalculo = false;
  }

  // Previne múltiplos pontos no mesmo número
  if (val === '.') {
    const partes = expressao.split(/[\+\-\*\/]/);
    const ultimo = partes[partes.length - 1];
    if (ultimo.includes('.')) return;
  }

  expressao += val;
  expressionEl.textContent = '';
  atualizarDisplay(formatarParaDisplay(expressao));
}

// ─── NEGAR NÚMERO (±) ─────────────────────
function negarNumero() {
  if (!expressao || expressao === '0') return;

  // Encontra o último número na expressão e o nega
  const match = expressao.match(/([\+\-\*\/]?)(-?\d+\.?\d*)$/);
  if (match) {
    const num = match[2];
    const neg = num.startsWith('-') ? num.slice(1) : '-' + num;
    expressao = expressao.slice(0, expressao.length - num.length) + neg;
    atualizarDisplay(formatarParaDisplay(expressao));
  }
}

// ─── APAGAR ÚLTIMO CARACTERE ──────────────
function apagar() {
  if (acabouCalculo) {
    limpar();
    return;
  }
  expressao = expressao.slice(0, -1);
  atualizarDisplay(formatarParaDisplay(expressao));
  if (!expressao) expressionEl.textContent = '';
}

// ─── LIMPAR TUDO ──────────────────────────
function limpar() {
  expressao     = '';
  acabouCalculo = false;
  displayEl.textContent   = '0';
  displayEl.className     = 'display-main';
  expressionEl.textContent = '';
}

// ─── CALCULAR ─────────────────────────────
function calcular() {
  if (!expressao) return;

  const exprDisplay = formatarParaDisplay(expressao);
  let resultado;

  try {
    // Avalia a expressão de forma segura
    resultado = Function('"use strict"; return (' + expressao + ')')();

    if (!isFinite(resultado)) throw new Error('Divisão por zero');

    // Arredonda imprecisões de ponto flutuante
    resultado = parseFloat(resultado.toPrecision(12));
    resultado = +resultado; // remove zeros à direita
  } catch (e) {
    displayEl.textContent = 'Erro';
    displayEl.className   = 'display-main error';
    expressao     = '';
    acabouCalculo = true;
    return;
  }

  // Registra no histórico
  adicionarHistorico(exprDisplay, resultado);

  // Atualiza display com destaque de resultado
  expressionEl.textContent = exprDisplay + ' =';
  displayEl.textContent    = resultado;
  displayEl.className      = 'display-main result';

  expressao     = String(resultado);
  acabouCalculo = true;
}

// ─── FORMATAR EXPRESSÃO PARA EXIBIÇÃO ─────
function formatarParaDisplay(expr) {
  return expr
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g,  '−')
    || '0';
}

// ─── ATUALIZAR DISPLAY PRINCIPAL ──────────
function atualizarDisplay(valor) {
  displayEl.textContent = valor || '0';
  displayEl.className   = 'display-main';

  // Efeito de piscar ao digitar
  displayEl.classList.add('blink');
  setTimeout(() => displayEl.classList.remove('blink'), 200);
}

// ─── ADICIONAR AO HISTÓRICO ───────────────
function adicionarHistorico(expr, res) {
  listaHistorico.unshift({ expr, res });
  if (listaHistorico.length > 20) listaHistorico.pop();
  renderizarHistorico();
}

// ─── RENDERIZAR HISTÓRICO ─────────────────
function renderizarHistorico() {
  if (listaHistorico.length === 0) {
    historicoEl.innerHTML = '<div class="history-empty" id="empty-msg">Nenhum cálculo ainda</div>';
    return;
  }

  historicoEl.innerHTML = listaHistorico
    .map((item, i) => `
      <div class="history-item" onclick="usarDoHistorico(${i})">
        <div class="expr">${item.expr}</div>
        <div class="res">${item.res}</div>
      </div>
    `)
    .join('');
}

// ─── USAR RESULTADO DO HISTÓRICO ──────────
function usarDoHistorico(i) {
  const item = listaHistorico[i];
  expressao = String(item.res);

  displayEl.textContent    = item.res;
  displayEl.className      = 'display-main';
  expressionEl.textContent = item.expr + ' =';
  acabouCalculo = true;
}

// ─── LIMPAR HISTÓRICO ─────────────────────
function limparHistorico() {
  listaHistorico = [];
  renderizarHistorico();
}

// ─── EFEITO RIPPLE NOS BOTÕES ─────────────
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width  = ripple.style.height = size + 'px';
    ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ─── SUPORTE A TECLADO ────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9')          adicionar(e.key);
  else if (['+', '-', '*', '/', '%'].includes(e.key)) adicionar(e.key);
  else if (e.key === '.')                    adicionar('.');
  else if (e.key === 'Enter' || e.key === '=') calcular();
  else if (e.key === 'Backspace')            apagar();
  else if (e.key === 'Escape')               limpar();
});