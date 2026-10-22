# Mundo da Gastronomia

Aplicativo em React Native (Expo) sobre gastronomia, com lista de pratos, tela de detalhes e formulário de avaliação.

**Autor:** Jean de Almeida Brito, Análise e Desenvolvimento de Sistemas, CEUB

## Telas

O app tem 3 telas, alternadas por estado (`useState`) no `App.js`:

1. **Lista (Parte 1):** banner com texto e lista de 5 pratos, cada um com imagem, nome e descrição. São 6 imagens no total (banner + 5 pratos).
2. **Detalhes (Parte 2):** ao tocar em um prato, abre a tela de detalhes com imagem, descrição de mais de 30 palavras, informações (origem, tempo de preparo, calorias e preço) e uma seção de relacionados. Somando as 5 descrições, o projeto passa de 150 palavras.
3. **Formulário (Parte 3):** avaliação da experiência gastronômica.

## Estruturas do formulário (Parte 3)

| Exigência | Implementação |
|---|---|
| Título | "Avalie sua experiência gastronômica" |
| 4 inputs de texto | Nome, E-mail, Cidade, Comentário |
| 2 Pickers | Prato favorito, Refeição preferida |
| 2 Sliders | Nota geral (0 a 10), Orçamento por refeição (R$ 10 a R$ 200) |
| 2 Switches | Vegetariano(a), Receber novidades por e-mail |
| 2 botões com interação | **Enviar** mostra um resumo em alerta; **Limpar** reseta todos os campos |

## Tecnologias

- React Native com Expo (Snack, **Expo SDK 54**)
- `@react-native-picker/picker` 2.11.1
- `@react-native-community/slider` 5.0.1

## Como executar

**Link do projeto no Snack:** https://snack.expo.dev/@jeanbrito061/mundo-da-gastronomia

1. Abrir o projeto no Snack pelo link acima, com o **Expo SDK 54** selecionado.
2. Conferir se o `package.json` tem as duas dependências nas versões indicadas acima.
3. Executar na aba **Web** do Snack.

## ⚠️ Observação sobre execução em dispositivo físico

O projeto funciona normalmente na aba **Web** do Snack. Em um dispositivo físico (aba **My Device**, com o Expo Go), ele **não abre** por uma incompatibilidade de versões que não tem relação com o código:

- O `Picker` (`@react-native-picker/picker`) e o `Slider` (`@react-native-community/slider`) são **módulos nativos**. Eles precisam ser da mesma versão de SDK que o Expo Go instalado no celular.
- O Expo Go atual, baixado da App Store, suporta apenas o **SDK 57**. No iOS não é possível instalar versões antigas do Expo Go.
- O Expo Snack permite selecionar no máximo o **SDK 55**.
- Com essa diferença, o celular mostra o erro `TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found`, gerado ao carregar o `@react-native-picker/picker`.

Os componentes foram mantidos como pedido nas exigências da atividade (`<Picker>` e `<Slider>` das bibliotecas oficiais). Para testar o projeto, use a aba **Web** do Snack.
