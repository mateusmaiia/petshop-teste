// Função para inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
   // Verificar se estamos na página inicial
   if (document.getElementById('lista-produtos')) {
      carregarProdutos()

      // Adicionar event listeners aos botões de categoria
      const botoesCategorias = document.querySelectorAll('.categoria-btn')
      botoesCategorias.forEach((botao) => {
         botao.addEventListener('click', (e) => {
            // Remover classe active de todos os botões
            botoesCategorias.forEach((b) => b.classList.remove('active'))

            // Adicionar classe active ao botão clicado
            e.currentTarget.classList.add('active')

            // Filtrar produtos
            const categoria = e.currentTarget.dataset.categoria
            filtrarProdutos(categoria)
         })
      })
   }

   // Atualizar contador do carrinho
   atualizarContadorCarrinho()
})

// Função para carregar todos os produtos
async function carregarProdutos() {
   const produtosContainer = document.getElementById('lista-produtos')

   try {
      // Mostrar loading
      produtosContainer.innerHTML =
         '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>'

      // Buscar produtos da API
      const produtos = await api.getProdutos()

      // Adicionar os produtos ao DOM
      exibirProdutos(produtos)
   } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      produtosContainer.innerHTML =
         '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>'
   }
}

// Função para filtrar produtos por categoria
async function filtrarProdutos(categoria) {
   const produtosContainer = document.getElementById('lista-produtos')

   try {
      // Mostrar loading
      produtosContainer.innerHTML =
         '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>'

      let produtos

      if (categoria === 'todos') {
         produtos = await api.getProdutos()
      } else {
         produtos = await api.getProdutosPorCategoria(categoria)
      }

      // Adicionar os produtos ao DOM
      exibirProdutos(produtos)
   } catch (error) {
      console.error('Erro ao filtrar produtos:', error)
      produtosContainer.innerHTML =
         '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>'
   }
}

// Função para exibir os produtos no DOM
function exibirProdutos(produtos) {
   const produtosContainer = document.getElementById('lista-produtos')

   // Limpar o container
   produtosContainer.innerHTML = ''

   // Verificar se temos produtos
   if (produtos && produtos.length > 0) {
      produtos.forEach((produto) => {
         const produtoElement = criarElementoProduto(produto)
         produtosContainer.appendChild(produtoElement)
      })
   } else {
      produtosContainer.innerHTML =
         '<p class="sem-produtos">Nenhum produto encontrado nesta categoria.</p>'
   }
}

// Função para criar um elemento de produto
function criarElementoProduto(produto) {
   const div = document.createElement('div')
   div.className = 'produto-card'

   // Solução robusta para as imagens
   let imagemSrc =
      'https://via.placeholder.com/600x400/f8f9fa/dddddd?text=PetAmigo'

   if (produto.imagem && produto.imagem.startsWith('http')) {
      // Usar URLs diretas do Unsplash sem parâmetros complexos
      if (produto.imagem.includes('unsplash.com')) {
         // Remove todos os parâmetros existentes e adiciona apenas tamanho e qualidade
         imagemSrc = produto.imagem.split('?')[0] + '?w=600&q=80'
      } else {
         // Para outras fontes de imagem, usa a URL diretamente
         imagemSrc = produto.imagem
      }
   }

   // Badge de destaque ou tag só é adicionada se existir
   const badgeHTML = produto.tag
      ? `<span class="produto-badge">${produto.tag}</span>`
      : ''

   div.innerHTML = `
      ${badgeHTML}
      <div class="produto-img">
         <img src="${imagemSrc}" alt="${
      produto.nome
   }" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400/f8f9fa/dddddd?text=PetAmigo';">
      </div>
      <div class="produto-info">
         <div class="produto-categoria">
            <i class="fas ${getCategoriaIcon(produto.categoria)}"></i>
            ${getCategoriaLabel(produto.categoria)}
         </div>
         <h3>${produto.nome}</h3>
         <p>${produto.descricao.substring(0, 100)}${
      produto.descricao.length > 100 ? '...' : ''
   }</p>
         <div class="produto-metadata">
            <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
            <div class="produto-avaliacao">
               ${gerarEstrelas(produto.avaliacao)}
               <span>(${produto.avaliacao.toFixed(1)})</span>
            </div>
         </div>
         <div class="produto-actions">
            <button class="btn" onclick="adicionarAoCarrinho(${produto.id})">
               <i class="fas fa-shopping-cart"></i> Adicionar
            </button>
            <a href="pages/produto.html?id=${
               produto.id
            }" class="btn btn-outline">
               Detalhes
            </a>
         </div>
      </div>
   `

   return div
}

// Função para gerar ícone baseado na categoria
function getCategoriaIcon(categoria) {
   switch (categoria) {
      case 'alimentacao':
         return 'fa-bowl-food'
      case 'brinquedos':
         return 'fa-baseball'
      case 'acessorios':
         return 'fa-tag'
      case 'higiene':
         return 'fa-shower'
      default:
         return 'fa-paw'
   }
}

// Função para gerar label da categoria
function getCategoriaLabel(categoria) {
   switch (categoria) {
      case 'alimentacao':
         return 'Alimentação'
      case 'brinquedos':
         return 'Brinquedos'
      case 'acessorios':
         return 'Acessórios'
      case 'higiene':
         return 'Higiene'
      default:
         return categoria
   }
}

// Função para gerar estrelas HTML
function gerarEstrelas(avaliacao) {
   const estrelaCheia = '<i class="fas fa-star"></i>'
   const estrelaMeia = '<i class="fas fa-star-half-alt"></i>'
   const estrelaVazia = '<i class="far fa-star"></i>'

   let estrelas = ''

   // Número de estrelas inteiras
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

// Funções para gerenciar o carrinho
function adicionarAoCarrinho(produtoId) {
   let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

   // Verificar se o produto já está no carrinho
   const produtoExistente = carrinho.find((item) => item.id === produtoId)

   if (produtoExistente) {
      produtoExistente.quantidade += 1
   } else {
      carrinho.push({
         id: produtoId,
         quantidade: 1,
      })
   }

   // Salvar carrinho atualizado
   localStorage.setItem('carrinho', JSON.stringify(carrinho))

   // Atualizar contador
   atualizarContadorCarrinho()

   // Feedback ao usuário com animação
   mostrarNotificacao('Produto adicionado ao carrinho!', 'success')
}

function atualizarContadorCarrinho() {
   const contador = document.getElementById('cart-count')
   if (!contador) return

   const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
   const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
   )

   contador.textContent = totalItens
}

// Função para mostrar notificações flutuantes
function mostrarNotificacao(mensagem, tipo = 'info') {
   // Criar elemento de notificação
   const notificacao = document.createElement('div')
   notificacao.className = `notificacao ${tipo}`
   notificacao.innerHTML = `
      <div class="notificacao-conteudo">
         <i class="fas ${
            tipo === 'success' ? 'fa-check-circle' : 'fa-info-circle'
         }"></i>
         <span>${mensagem}</span>
      </div>
   `

   // Adicionar ao corpo do documento
   document.body.appendChild(notificacao)

   // Adicionar classe para animar a entrada
   setTimeout(() => {
      notificacao.classList.add('mostrar')
   }, 10)

   // Remover após alguns segundos
   setTimeout(() => {
      notificacao.classList.remove('mostrar')
      setTimeout(() => {
         document.body.removeChild(notificacao)
      }, 300)
   }, 3000)
}

// Adicionar estilo para notificações via JavaScript
const estiloNotificacao = document.createElement('style')
estiloNotificacao.textContent = `
   .notificacao {
      position: fixed;
      bottom: 20px;
      right: 20px;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
   }
   
   .notificacao.mostrar {
      transform: translateY(0);
      opacity: 1;
   }
   
   .notificacao-conteudo {
      background-color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 16px 24px;
      display: flex;
      align-items: center;
   }
   
   .notificacao.success .notificacao-conteudo {
      border-left: 4px solid #4a9b4f;
   }
   
   .notificacao.info .notificacao-conteudo {
      border-left: 4px solid #3498db;
   }
   
   .notificacao i {
      margin-right: 12px;
      font-size: 1.2rem;
   }
   
   .notificacao.success i {
      color: #4a9b4f;
   }
   
   .notificacao.info i {
      color: #3498db;
   }
`
document.head.appendChild(estiloNotificacao)
