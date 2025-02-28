// API com dados mock para o e-commerce de petshop
class API {
   constructor() {
      // Produtos fictícios de petshop com URLs diretas do Unsplash
      this.produtos = [
         {
            id: 1,
            nome: 'Ração Premium para Cães Adultos',
            descricao:
               'Ração balanceada de alta qualidade para cães adultos de todas as raças. Rica em proteínas e nutrientes essenciais para a saúde do seu pet.',
            preco: 89.9,
            imagem:
               'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600',
            categoria: 'alimentacao',
            estoque: 25,
            avaliacao: 4.8,
         },
         {
            id: 2,
            nome: 'Cama Ortopédica para Cães',
            descricao:
               'Cama ortopédica que oferece suporte adequado às articulações do seu cão, ideal para pets idosos ou com problemas articulares.',
            preco: 159.9,
            imagem:
               'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600',
            categoria: 'acessorios',
            estoque: 12,
            avaliacao: 4.7,
         },
         {
            id: 3,
            nome: 'Brinquedo Interativo para Gatos',
            descricao:
               'Brinquedo que estimula o instinto caçador do seu gato, mantendo-o entretido e ativo por horas.',
            preco: 45.9,
            imagem:
               'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=600',
            categoria: 'brinquedos',
            estoque: 30,
            avaliacao: 4.5,
         },
         {
            id: 4,
            nome: 'Shampoo Hipoalergênico para Pets',
            descricao:
               'Shampoo suave e hipoalergênico, ideal para pets com pele sensível. Limpa profundamente sem causar irritações.',
            preco: 35.9,
            imagem:
               'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=600',
            categoria: 'higiene',
            estoque: 18,
            avaliacao: 4.9,
         },
         {
            id: 5,
            nome: 'Coleira Personalizada para Cães',
            descricao:
               'Coleira ajustável, resistente e confortável. Personalização com o nome do seu pet e seu contato.',
            preco: 29.9,
            imagem:
               'https://images.unsplash.com/photo-1576432156035-41579f929b62?q=80&w=600',
            categoria: 'acessorios',
            estoque: 22,
            avaliacao: 4.6,
         },
         {
            id: 6,
            nome: 'Caixa de Transporte para Pets',
            descricao:
               'Caixa de transporte segura e espaçosa, ideal para levar seu pet ao veterinário ou em viagens.',
            preco: 120.9,
            imagem:
               'https://images.unsplash.com/photo-1601758124277-f0086d5ab050?q=80&w=600',
            categoria: 'acessorios',
            estoque: 8,
            avaliacao: 4.4,
         },
         {
            id: 7,
            nome: 'Comedouro Automático para Pets',
            descricao:
               'Dispensa ração automaticamente em horários programados, garantindo a alimentação do seu pet mesmo quando você não está em casa.',
            preco: 199.9,
            imagem:
               'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=600',
            categoria: 'alimentacao',
            estoque: 5,
            avaliacao: 4.7,
         },
         {
            id: 8,
            nome: 'Ração Premium para Gatos',
            descricao:
               'Ração de alta qualidade, formulada especialmente para atender às necessidades nutricionais específicas dos gatos.',
            preco: 75.9,
            imagem:
               'https://images.unsplash.com/photo-1579445710183-f9a816f5da05?q=80&w=600',
            categoria: 'alimentacao',
            estoque: 20,
            avaliacao: 4.8,
         },
      ]
   }

   // Método para buscar todos os produtos
   async getProdutos() {
      try {
         // Simula um atraso de rede
         await new Promise((resolve) => setTimeout(resolve, 300))
         return [...this.produtos]
      } catch (error) {
         console.error('Erro ao buscar produtos:', error)
         return []
      }
   }

   // Método para buscar um produto específico
   async getProduto(id) {
      try {
         // Simula um atraso de rede
         await new Promise((resolve) => setTimeout(resolve, 300))
         const idNum = parseInt(id)
         return this.produtos.find((produto) => produto.id === idNum) || null
      } catch (error) {
         console.error('Erro ao buscar produto:', error)
         return null
      }
   }

   // Método para buscar produtos por categoria
   async getProdutosPorCategoria(categoria) {
      try {
         // Simula um atraso de rede
         await new Promise((resolve) => setTimeout(resolve, 300))
         return this.produtos.filter(
            (produto) => produto.categoria === categoria
         )
      } catch (error) {
         console.error('Erro ao buscar produtos por categoria:', error)
         return []
      }
   }

   // Método para adicionar um pedido
   async criarPedido(pedido) {
      try {
         // Simula um atraso de rede
         await new Promise((resolve) => setTimeout(resolve, 500))

         // Simula um ID de pedido
         const pedidoId = Math.floor(Math.random() * 100000)

         return {
            id: pedidoId,
            status: 'confirmado',
            data: new Date().toISOString(),
            ...pedido,
         }
      } catch (error) {
         console.error('Erro ao criar pedido:', error)
         return null
      }
   }
}

// Criar instância global da API
const api = new API()
