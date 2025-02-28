// Função para carregar detalhes do produto
async function carregarProduto() {
   // Obter o ID do produto da URL
   const urlParams = new URLSearchParams(window.location.search)
   const produtoId = urlParams.get('id')

   if (!produtoId) {
      window.location.href = '../index.html'
      return
   }

   try {
      // Carregar detalhes do produto
      const produto = await api.getProduto(produtoId)

      if (!produto) {
         document.getElementById('produto-detalhe').innerHTML = `
            <div class="erro-produto">
               <h2>Produto não encontrado</h2>
               <p>O produto que você está procurando não existe ou foi removido.</p>
               <a href="../index.html#produtos" class="btn">Ver todos os produtos</a>
            </div>
         `
         return
      }

      // Atualizar o breadcrumb
      document.getElementById('produto-nome-breadcrumb').textContent =
         produto.nome

      // Atualizar o título da página
      document.title = `${produto.nome} - PetAmigo`

      // Renderizar detalhes do produto
      renderizarProduto(produto)

      // Carregar produtos relacionados
      carregarProdutosRelacionados(produto.categoria, produto.id)
   } catch (error) {
      console.error('Erro ao carregar produto:', error)
      document.getElementById('produto-detalhe').innerHTML = `
         <div class="erro-produto">
            <h2>Erro ao carregar produto</h2>
            <p>Ocorreu um erro ao carregar os detalhes do produto. Tente novamente mais tarde.</p>
            <a href="../index.html#produtos" class="btn">Ver todos os produtos</a>
         </div>
      `
   }
}

// Função para renderizar detalhes do produto
function renderizarProduto(produto) {
   // Primeiro atualizar os metadados SEO
   atualizarMetadadosSEO(produto)

   const produtoDetalhe = document.getElementById('produto-detalhe')

   // Solução robusta para as imagens
   let imagemSrc =
      'https://via.placeholder.com/800x600/f8f9fa/dddddd?text=PetAmigo'

   if (produto.imagem && produto.imagem.startsWith('http')) {
      // Usar URLs diretas do Unsplash sem parâmetros complexos
      if (produto.imagem.includes('unsplash.com')) {
         // Remove todos os parâmetros existentes e adiciona apenas tamanho e qualidade
         imagemSrc = produto.imagem.split('?')[0] + '?w=800&q=80'
      } else {
         // Para outras fontes de imagem, usa a URL diretamente
         imagemSrc = produto.imagem
      }
   }

   const disponibilidade =
      produto.estoque > 0
         ? `<div class="produto-disponibilidade em-estoque"><i class="fas fa-check-circle"></i> Em estoque (${produto.estoque} unidades)</div>`
         : `<div class="produto-disponibilidade sem-estoque"><i class="fas fa-times-circle"></i> Fora de estoque</div>`

   produtoDetalhe.innerHTML = `
      <div class="produto-detalhe-content">
         <div class="produto-imagem-container">
            <img src="${imagemSrc}" alt="${
      produto.nome
   }" class="produto-imagem" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/f8f9fa/dddddd?text=PetAmigo';">
            ${
               produto.estoque < 5 && produto.estoque > 0
                  ? `<div class="produto-tag">Últimas unidades</div>`
                  : ''
            }
         </div>
         <div class="produto-info-detalhe">
            <h1>${produto.nome}</h1>
            <div class="produto-avaliacao">
               <div class="stars">${gerarEstrelas(produto.avaliacao)}</div>
               <div class="count">${produto.avaliacao.toFixed(1)} (${Math.floor(
      produto.avaliacao * 10
   )} avaliações)</div>
            </div>
            <div class="produto-preco-detalhe">R$ ${produto.preco.toFixed(
               2
            )}</div>
            ${disponibilidade}
            <div class="produto-descricao">
               <p>${produto.descricao}</p>
            </div>
            
            <div class="produto-quantidade">
               <label for="quantidade">Quantidade:</label>
               <div class="quantidade-selector">
                  <button class="quantidade-btn" id="diminuir-quantidade">-</button>
                  <input type="number" id="quantidade" class="quantidade-input" value="1" min="1" max="${
                     produto.estoque
                  }" ${produto.estoque === 0 ? 'disabled' : ''}>
                  <button class="quantidade-btn" id="aumentar-quantidade">+</button>
               </div>
            </div>
            
            <div class="produto-actions-detalhe">
               <button class="btn" id="adicionar-carrinho" ${
                  produto.estoque === 0 ? 'disabled' : ''
               }>
                  <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
               </button>
               <a href="carrinho.html" class="btn btn-secondary">
                  <i class="fas fa-credit-card"></i> Comprar Agora
               </a>
            </div>
         </div>
      </div>
   `

   // Configurar eventos para os botões de quantidade
   if (produto.estoque > 0) {
      document
         .getElementById('diminuir-quantidade')
         .addEventListener('click', () => {
            const input = document.getElementById('quantidade')
            if (input.value > 1) {
               input.value = parseInt(input.value) - 1
            }
         })

      document
         .getElementById('aumentar-quantidade')
         .addEventListener('click', () => {
            const input = document.getElementById('quantidade')
            if (parseInt(input.value) < produto.estoque) {
               input.value = parseInt(input.value) + 1
            }
         })

      document
         .getElementById('adicionar-carrinho')
         .addEventListener('click', () => {
            const quantidade = parseInt(
               document.getElementById('quantidade').value
            )
            adicionarAoCarrinhoComQuantidade(produto.id, quantidade)
         })
   }
}

// Função para adicionar ao carrinho com quantidade
function adicionarAoCarrinhoComQuantidade(produtoId, quantidade) {
   let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

   // Verificar se o produto já está no carrinho
   const produtoExistente = carrinho.find((item) => item.id === produtoId)

   if (produtoExistente) {
      produtoExistente.quantidade += quantidade
   } else {
      carrinho.push({
         id: produtoId,
         quantidade: quantidade,
      })
   }

   // Salvar carrinho atualizado
   localStorage.setItem('carrinho', JSON.stringify(carrinho))

   // Atualizar contador
   atualizarContadorCarrinho()

   // Mostrar notificação
   mostrarNotificacao(
      `${quantidade} item(s) adicionado(s) ao carrinho!`,
      'success'
   )
}

// Função para carregar produtos relacionados
async function carregarProdutosRelacionados(categoria, produtoAtualId) {
   const container = document.getElementById('produtos-relacionados')

   try {
      // Buscar produtos da mesma categoria
      const produtos = await api.getProdutosPorCategoria(categoria)

      // Filtrar apenas produtos diferentes do atual
      const produtosRelacionados = produtos.filter(
         (p) => p.id !== parseInt(produtoAtualId)
      )

      // Limitar a 4 produtos relacionados
      const produtosLimitados = produtosRelacionados.slice(0, 4)

      if (produtosLimitados.length === 0) {
         document.querySelector('.produto-relacionados-titulo').style.display =
            'none'
         container.style.display = 'none'
         return
      }

      // Exibir produtos relacionados
      container.innerHTML = ''
      produtosLimitados.forEach((produto) => {
         const produtoElement = criarElementoProduto(produto)
         container.appendChild(produtoElement)
      })
   } catch (error) {
      console.error('Erro ao carregar produtos relacionados:', error)
      container.innerHTML = '<p>Erro ao carregar produtos relacionados.</p>'
   }
}

// Função para atualizar os metadados SEO dinamicamente
function atualizarMetadadosSEO(produto) {
   if (!produto) return // Proteção contra erro se produto for undefined

   // Atualizar título da página
   document.title = `${produto.nome} - PetAmigo`

   // Atualizar meta description
   const metaDescription = document.querySelector('meta[name="description"]')
   if (metaDescription) {
      metaDescription.setAttribute(
         'content',
         produto.descricao.substring(0, 160)
      )
   }

   // Atualizar schema de dados estruturados para Rich Snippets
   try {
      const schemaScript = document.getElementById('produto-schema')
      if (schemaScript) {
         const schema = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: produto.nome,
            image: produto.imagem,
            description: produto.descricao,
            brand: {
               '@type': 'Brand',
               name: 'PetAmigo',
            },
            offers: {
               '@type': 'Offer',
               url: window.location.href,
               priceCurrency: 'BRL',
               price: produto.preco.toFixed(2),
               availability:
                  produto.estoque > 0
                     ? 'https://schema.org/InStock'
                     : 'https://schema.org/OutOfStock',
            },
            aggregateRating: {
               '@type': 'AggregateRating',
               ratingValue: produto.avaliacao.toString(),
               reviewCount: Math.floor(produto.avaliacao * 10).toString(),
            },
         }

         schemaScript.textContent = JSON.stringify(schema, null, 2)
      }
   } catch (error) {
      console.error('Erro ao atualizar schema:', error)
   }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
   carregarProduto()
   atualizarContadorCarrinho()
})
