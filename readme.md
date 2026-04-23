# Calculadora Plus em JavaScript

## Sobre o Desafio!

Esse projeto foi desenvolvido como parte das atividades práticas da disciplina, com o objetivo de aplicar os conceitos de HTML, CSS e JavaScript aprendidos em aula.

A ideia foi criar uma calculadora funcional do zero, começando pelo básico e evoluindo aos poucos. No caminho, fui adicionando funcionalidades que pareciam interessantes, como o histórico de operações, suporte ao teclado e um visual mais cuidado. Aprendi bastante no processo, especialmente na parte de manipulação do DOM e tratamento de erros.

---

## Funcionalidades

- Operações básicas: soma, subtração, multiplicação e divisão
- Porcentagem (%)
- Inversão de sinal (±)
- Apagar último caractere (⌫)
- Limpar display (C)
- Histórico com os últimos 20 cálculos
- Clique em qualquer item do histórico para reutilizar o resultado
- Suporte completo ao teclado
- Tratamento de erros (divisão por zero, expressão inválida)

---

## Como usar

1. Abra o arquivo `calculadora.html` no navegador
2. Digite os números clicando nos botões ou usando o teclado
3. Escolha a operação desejada
4. Pressione `=` ou `Enter` para ver o resultado
5. O resultado fica salvo no histórico ao lado
6. Clique em qualquer item do histórico para usar aquele valor novamente
7. Para limpar, pressione `C` ou `Esc`

### Atalhos de teclado

| Tecla       | Ação                    |
|-------------|-------------------------|
| 0–9         | Digitar número          |
| + - * /     | Operadores              |
| %           | Porcentagem             |
| . (ponto)   | Decimal                 |
| Enter ou =  | Calcular                |
| Backspace   | Apagar último caractere |
| Esc         | Limpar tudo             |

---

## Estrutura dos arquivos

```
📁 calculadora/
  ├── calculadora.html   → estrutura da página
  ├── style.css          → estilos e visual
  └── funcoes.js         → toda a lógica da calculadora
```

---

## Plano de Testes

### Objetivo

Verificar se todas as funcionalidades da calculadora estão funcionando corretamente, incluindo operações matemáticas, comportamentos especiais e situações de erro.

---

### Casos de Teste — Operações Básicas

| ID | Descrição         | Entrada  | Resultado Esperado | Resultado Obtido | Status |
|----|-------------------|----------|--------------------|------------------|--------|
| 01 | Soma simples      | 2 + 2    | 4                  | 4                | ✅ OK  |
| 02 | Subtração simples | 5 − 3    | 2                  | 2                | ✅ OK  |
| 03 | Multiplicação     | 4 × 3    | 12                 | 12               | ✅ OK  |
| 04 | Divisão exata     | 10 ÷ 2   | 5                  | 5                | ✅ OK  |
| 05 | Divisão com resto | 7 ÷ 2    | 3.5                | 3.5              | ✅ OK  |
| 06 | Resultado negativo| 3 − 8    | -5                 | -5               | ✅ OK  |
| 07 | Soma com negativo | -4 + 10  | 6                  | 6                | ✅ OK  |

---

### Casos de Teste — Números Decimais

| ID | Descrição               | Entrada       | Resultado Esperado | Resultado Obtido | Status |
|----|-------------------------|---------------|--------------------|------------------|--------|
| 08 | Soma com decimais       | 1.5 + 2.3     | 3.8                | 3.8              | ✅ OK  |
| 09 | Multiplicação decimal   | 0.1 × 3       | 0.3                | 0.3              | ✅ OK  |
| 10 | Dois pontos no número   | 1..5          | Bloqueado          | Bloqueado        | ✅ OK  |

---

### Casos de Teste — Porcentagem

| ID | Descrição               | Entrada   | Resultado Esperado | Resultado Obtido | Status |
|----|-------------------------|-----------|--------------------|------------------|--------|
| 11 | Cálculo com %           | 200 × 10% | 20                 | 20               | ✅ OK  |
| 12 | Soma com %              | 100 + 50% | 150                | 150              | ✅ OK  |

---

### Casos de Teste — Botão ± (Inverter Sinal)

| ID | Descrição               | Entrada | Ação | Resultado Esperado | Resultado Obtido | Status |
|----|-------------------------|---------|------|--------------------|------------------|--------|
| 13 | Número positivo → negativo | 7   | ±    | -7                 | -7               | ✅ OK  |
| 14 | Número negativo → positivo | -7  | ±    | 7                  | 7                | ✅ OK  |
| 15 | Display zerado            | 0   | ±    | Sem alteração      | Sem alteração    | ✅ OK  |

---

### Casos de Teste — Tratamento de Erros

| ID | Descrição               | Entrada  | Resultado Esperado | Resultado Obtido | Status |
|----|-------------------------|----------|--------------------|------------------|--------|
| 16 | Divisão por zero        | 10 ÷ 0   | Erro               | Erro             | ✅ OK  |
| 17 | Expressão inválida      | * + 5    | Erro               | Erro             | ✅ OK  |
| 18 | Display vazio           | (vazio)  | Nada acontece      | Nada acontece    | ✅ OK  |

---

### Casos de Teste — Botão Apagar (⌫)

| ID | Descrição                      | Situação         | Resultado Esperado  | Resultado Obtido | Status |
|----|-------------------------------|------------------|---------------------|------------------|--------|
| 19 | Apagar último dígito          | Digitando 123    | 12                  | 12               | ✅ OK  |
| 20 | Apagar após calcular          | Resultado exibido| Display zera        | Display zera     | ✅ OK  |
| 21 | Apagar com display vazio      | Display vazio    | Permanece vazio     | Permanece vazio  | ✅ OK  |

---

### Casos de Teste — Histórico

| ID | Descrição                           | Ação                        | Resultado Esperado        | Resultado Obtido          | Status |
|----|------------------------------------|-----------------------------|---------------------------|---------------------------|--------|
| 22 | Salvar no histórico                | Calcular 5 + 5              | Aparece "5 + 5 = 10"      | Aparece "5 + 5 = 10"      | ✅ OK  |
| 23 | Reutilizar item do histórico       | Clicar no item              | Resultado vai pro display | Resultado vai pro display | ✅ OK  |
| 24 | Limpar histórico                   | Botão "Limpar"              | Lista some                | Lista some                | ✅ OK  |
| 25 | Limite de 20 itens                 | Fazer 21 cálculos           | Mantém só os 20 últimos   | Mantém só os 20 últimos   | ✅ OK  |

---

### Casos de Teste — Teclado

| ID | Descrição             | Tecla pressionada | Resultado Esperado     | Resultado Obtido     | Status |
|----|-----------------------|-------------------|------------------------|----------------------|--------|
| 26 | Digitar número        | Tecla 5           | 5 aparece no display   | 5 aparece no display | ✅ OK  |
| 27 | Digitar operador      | Tecla +           | + adicionado           | + adicionado         | ✅ OK  |
| 28 | Calcular com Enter    | Enter             | Resultado exibido      | Resultado exibido    | ✅ OK  |
| 29 | Apagar com Backspace  | Backspace         | Último char removido   | Último char removido | ✅ OK  |
| 30 | Limpar com Esc        | Esc               | Display limpo          | Display limpo        | ✅ OK  |

---

## Problemas encontrados durante o desenvolvimento

**Divisão por zero:** No início, o código não tratava esse caso e acabava mostrando `Infinity` na tela. Resolvi adicionando uma verificação com `isFinite()` antes de exibir o resultado.

**Ponto decimal duplicado:** Era possível digitar dois pontos no mesmo número, o que gerava um erro na hora de calcular. Corrigi verificando se o número atual já tem ponto antes de deixar adicionar outro.

**Imprecisão de ponto flutuante:** Contas como `0.1 + 0.2` retornavam `0.30000000000000004` por causa de como o JavaScript lida com decimais. Resolvi usando `toPrecision(12)` para arredondar o resultado.

**Continuar digitando após calcular:** Depois de ver o resultado, se o usuário digitasse um número novo, ele ficava colado no resultado anterior. Resolvi com a flag `acabouCalculo`, que controla esse comportamento.

---

## Conclusão

O projeto ficou bem acima do que eu esperava no começo. Comecei com uma calculadora simples e fui melhorando aos poucos conforme aprendia mais sobre JavaScript.

As partes que achei mais difíceis foram o tratamento de erros e controlar o estado da calculadora depois de um cálculo. Mas no final consegui resolver tudo e ficou funcionando bem.

Ainda dá pra melhorar com coisas como histórico salvo no `localStorage`, operações mais avançadas ou até um tema claro/escuro. Mas para o escopo proposto, acredito que está completo.

---

## Autor

Victor Augusto
