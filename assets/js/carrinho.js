// Função para inicializar o carrinho
document.addEventListener('DOMContentLoaded', () => {
   carregarCarrinho()
})

// Função para carregar o carrinho
async function carregarCarrinho() {
   const carrinhoContainer = document.getElementById('carrinho-container')

   try {
      // Obter itens do carrinho do localStorage
      const carrinhoItens = JSON.parse(localStorage.getItem('carrinho')) || []

      // Se o carrinho estiver vazio
      if (carrinhoItens.length === 0) {
         renderizarCarrinhoVazio()
         return
      }

      // Array para armazenar os detalhes dos produtos
      const produtosDetalhes = []

      // Buscar detalhes de cada produto
      for (const item of carrinhoItens) {
         const produto = await api.getProduto(item.id)
         if (produto) {
            produtosDetalhes.push({
               ...produto,
               quantidade: item.quantidade,
            })
         }
      }

      // Renderizar o carrinho com os detalhes
      renderizarCarrinho(produtosDetalhes)
   } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
      carrinhoContainer.innerHTML = `
         <div class="erro-carrinho">
            <h2>Erro ao carregar carrinho</h2>
            <p>Ocorreu um erro ao carregar os itens do carrinho. Tente novamente mais tarde.</p>
            <a href="../index.html" class="btn">Voltar para a loja</a>
         </div>
      `
   }
}

// Função para renderizar carrinho vazio
function renderizarCarrinhoVazio() {
   const carrinhoContainer = document.getElementById('carrinho-container')

   carrinhoContainer.innerHTML = `
      <div class="carrinho-vazio">
         <i class="fas fa-shopping-cart"></i>
         <h2>Seu carrinho está vazio</h2>
         <p>Parece que você ainda não adicionou nenhum produto ao seu carrinho.</p>
         <a href="../index.html#produtos" class="btn">Continuar Comprando</a>
      </div>
   `
}

// Função para renderizar carrinho com produtos
function renderizarCarrinho(produtos) {
   const carrinhoContainer = document.getElementById('carrinho-container')
   const subtotal = calcularSubtotal(produtos)
   const frete = calcularFrete(subtotal)
   const total = subtotal + frete

   carrinhoContainer.innerHTML = `
      <div class="carrinho-conteudo">
         <div class="carrinho-items">
            ${produtos.map((produto) => criarItemCarrinho(produto)).join('')}
         </div>
         
         <div class="resumo-compra">
            <h2>Resumo da Compra</h2>
            
            <div class="resumo-item">
               <span>Subtotal</span>
               <span>R$ ${subtotal.toFixed(2)}</span>
            </div>
            
            <div class="resumo-item">
               <span>Frete</span>
               <span>${frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}</span>
            </div>
            
            <div class="resumo-item resumo-total">
               <span>Total</span>
               <span>R$ ${total.toFixed(2)}</span>
            </div>
            
            <div class="resumo-cupom">
               <input type="text" id="cupom-input" placeholder="Cupom de desconto" />
               <button class="btn" id="aplicar-cupom">Aplicar</button>
            </div>
            
            <button class="btn btn-finalizar" id="finalizar-compra">
               Finalizar Compra
            </button>
            
            <a href="../index.html#produtos" class="btn-continuar-comprando">
               Continuar Comprando
            </a>
         </div>
      </div>
   `

   // Adicionar eventos aos botões
   adicionarEventosBotoes(produtos)
}

// Função para criar um item do carrinho
function criarItemCarrinho(produto) {
   const subtotal = produto.preco * produto.quantidade

   // Verificar se a imagem é uma URL absoluta
   const imagemSrc = produto.imagem.startsWith('http')
      ? produto.imagem
      : `../${produto.imagem}`

   return `
      <div class="carrinho-item">
         <img src="${imagemSrc}" alt="${
      produto.nome
   }" class="carrinho-item-imagem">
         
         <div class="carrinho-item-info">
            <h3>${produto.nome}</h3>
            <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
            
            <div class="carrinho-item-actions">
               <div class="carrinho-item-quantidade">
                  <button class="diminuir-quantidade" data-id="${
                     produto.id
                  }">-</button>
                  <span>${produto.quantidade}</span>
                  <button class="aumentar-quantidade" data-id="${
                     produto.id
                  }">+</button>
               </div>
               
               <button class="remover-item" data-id="${produto.id}">
                  <i class="fas fa-trash"></i>
               </button>
            </div>
         </div>
         
         <div class="carrinho-item-subtotal">
            <span>R$ ${subtotal.toFixed(2)}</span>
         </div>
      </div>
   `
}

// Função para calcular o subtotal
function calcularSubtotal(produtos) {
   return produtos.reduce((total, produto) => {
      return total + produto.preco * produto.quantidade
   }, 0)
}

// Função para calcular o frete
function calcularFrete(subtotal) {
   // Frete grátis para compras acima de R$ 150
   return subtotal >= 150 ? 0 : 12.9
}

// Função para adicionar eventos aos botões
function adicionarEventosBotoes(produtos) {
   // Botões de quantidade
   document.querySelectorAll('.diminuir-quantidade').forEach((botao) => {
      botao.addEventListener('click', () => {
         alterarQuantidade(parseInt(botao.dataset.id), -1)
      })
   })

   document.querySelectorAll('.aumentar-quantidade').forEach((botao) => {
      botao.addEventListener('click', () => {
         alterarQuantidade(parseInt(botao.dataset.id), 1)
      })
   })

   // Botões de remover
   document.querySelectorAll('.remover-item').forEach((botao) => {
      botao.addEventListener('click', () => {
         removerItem(parseInt(botao.dataset.id))
      })
   })

   // Botão de aplicar cupom
   document.getElementById('aplicar-cupom').addEventListener('click', () => {
      const cupom = document
         .getElementById('cupom-input')
         .value.trim()
         .toUpperCase()

      if (cupom) {
         // Os cupons válidos são PETAMIGO10 e FRETEGRATIS
         if (cupom === 'PETAMIGO10') {
            // Calcular novo total com desconto
            const subtotal = calcularSubtotal(produtos) * 0.9 // 10% de desconto
            const frete = calcularFrete(subtotal)
            const total = subtotal + frete

            // Atualizar resumo
            document.querySelector(
               '.resumo-item:nth-child(2) span:last-child'
            ).textContent = `R$ ${subtotal.toFixed(2)} (10% desconto)`
            document.querySelector(
               '.resumo-item:nth-child(3) span:last-child'
            ).textContent = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`
            document.querySelector(
               '.resumo-total span:last-child'
            ).textContent = `R$ ${total.toFixed(2)}`

            mostrarNotificacao('Cupom aplicado! 10% de desconto.', 'success')
         } else if (cupom === 'FRETEGRATIS') {
            // Calcular novo total com frete grátis
            const subtotal = calcularSubtotal(produtos)
            const total = subtotal // Frete grátis

            // Atualizar resumo
            document.querySelector(
               '.resumo-item:nth-child(3) span:last-child'
            ).textContent = 'Grátis (cupom)'
            document.querySelector(
               '.resumo-total span:last-child'
            ).textContent = `R$ ${total.toFixed(2)}`

            mostrarNotificacao('Cupom aplicado! Frete grátis.', 'success')
         } else {
            mostrarNotificacao(
               'Cupom inválido. Tente PETAMIGO10 ou FRETEGRATIS.',
               'info'
            )
         }
      } else {
         mostrarNotificacao('Por favor, insira um cupom válido.', 'info')
      }
   })

   // Botão de finalizar compra
   document.getElementById('finalizar-compra').addEventListener('click', () => {
      finalizarCompra(produtos)
   })
}

// Função para alterar a quantidade de um item
async function alterarQuantidade(produtoId, delta) {
   // Obter carrinho atual
   const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

   // Encontrar o produto
   const item = carrinho.find((item) => item.id === produtoId)

   if (!item) return

   // Obter detalhes do produto para verificar o estoque
   const produto = await api.getProduto(produtoId)

   // Atualizar quantidade
   const novaQuantidade = item.quantidade + delta

   // Verificar limites (não permitir menos que 1 ou mais que o estoque)
   if (novaQuantidade < 1) {
      removerItem(produtoId)
      return
   }

   if (produto && novaQuantidade > produto.estoque) {
      mostrarNotificacao(
         `Desculpe, temos apenas ${produto.estoque} unidades disponíveis.`,
         'info'
      )
      return
   }

   // Atualizar quantidade
   item.quantidade = novaQuantidade

   // Salvar carrinho atualizado
   localStorage.setItem('carrinho', JSON.stringify(carrinho))

   // Recarregar o carrinho para refletir as mudanças
   carregarCarrinho()

   // Atualizar contador
   atualizarContadorCarrinho()
}

// Função para remover um item do carrinho
function removerItem(produtoId) {
   // Obter carrinho atual
   let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

   // Remover o produto
   carrinho = carrinho.filter((item) => item.id !== produtoId)

   // Salvar carrinho atualizado
   localStorage.setItem('carrinho', JSON.stringify(carrinho))

   // Recarregar o carrinho
   carregarCarrinho()

   // Atualizar contador
   atualizarContadorCarrinho()

   // Mostrar notificação
   mostrarNotificacao('Item removido do carrinho.', 'info')
}

// Função para finalizar a compra
function finalizarCompra(produtos) {
   // Simulação de envio de pedido
   const pedido = {
      itens: produtos.map((p) => ({
         id: p.id,
         nome: p.nome,
         quantidade: p.quantidade,
         preco: p.preco,
      })),
      subtotal: calcularSubtotal(produtos),
      frete: calcularFrete(calcularSubtotal(produtos)),
      total:
         calcularSubtotal(produtos) + calcularFrete(calcularSubtotal(produtos)),
      data: new Date().toISOString(),
   }

   // Em um sistema real, enviaríamos para o backend
   console.log('Pedido finalizado:', pedido)

   // Limpar o carrinho
   localStorage.removeItem('carrinho')

   // Mostrar mensagem de sucesso
   document.getElementById('carrinho-container').innerHTML = `
      <div class="carrinho-sucesso">
         <i class="fas fa-check-circle"></i>
         <h2>Pedido realizado com sucesso!</h2>
         <p>Obrigado por comprar conosco. Seu pedido foi processado e será enviado em breve.</p>
         <p>Número do pedido: <strong>#${Math.floor(
            Math.random() * 10000
         )}</strong></p>
         <a href="../index.html" class="btn">Voltar para a loja</a>
      </div>
   `

   // Atualizar contador
   atualizarContadorCarrinho()
}

// Função para gerar estrelas com base na avaliação
function gerarEstrelas(avaliacao) {
   const estrelaCheia = '<i class="fas fa-star"></i>'
   const estrelaMeia = '<i class="fas fa-star-half-alt"></i>'
   const estrelaVazia = '<i class="far fa-star"></i>'

   let estrelas = ''

   // Número inteiro de estrelas
   const estrelasInteiras = Math.floor(avaliacao)

   // Se tem meia estrela
   const temMeiaEstrela = avaliacao - estrelasInteiras >= 0.5

   // Adicionar estrelas cheias
   for (let i = 0; i < estrelasInteiras; i++) {
      estrelas += estrelaCheia
   }

   // Adicionar meia estrela, se necessário
   if (temMeiaEstrela) {
      estrelas += estrelaMeia
   }

   // Adicionar estrelas vazias
   const estrelasVazias = 5 - estrelasInteiras - (temMeiaEstrela ? 1 : 0)
   for (let i = 0; i < estrelasVazias; i++) {
      estrelas += estrelaVazia
   }

   return estrelas
}

// Adicionar estilo para o sucesso da compra
const estiloSucesso = document.createElement('style')
estiloSucesso.textContent = `
   .carrinho-sucesso {
      text-align: center;
      padding: 50px 20px;
      background-color: var(--white);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
   }
   
   .carrinho-sucesso i {
      font-size: 4rem;
      color: var(--primary-color);
      margin-bottom: 20px;
   }
   
   .carrinho-sucesso h2 {
      margin-bottom: 15px;
      color: var(--text-color);
   }
   
   .carrinho-sucesso p {
      margin-bottom: 10px;
      color: var(--dark-gray);
   }
   
   .carrinho-sucesso strong {
      color: var(--primary-color);
   }
   
   .carrinho-sucesso .btn {
      margin-top: 20px;
   }
`

document.head.appendChild(estiloSucesso)
