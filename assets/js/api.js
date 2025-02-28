// API com dados mock para o e-commerce de petshop
class API {
   constructor() {
      // Produtos fictícios de petshop com URLs diretas e otimizadas
      this.produtos = [
         {
            id: 1,
            nome: 'Ração Premium para Cães Adultos',
            descricao:
               'Ração balanceada de alta qualidade para cães adultos de todas as raças. Rica em proteínas e nutrientes essenciais para a saúde do seu pet.',
            preco: 89.9,
            imagem: 'https://source.unsplash.com/random/600x400/?dog,food',
            categoria: 'alimentacao',
            estoque: 25,
            avaliacao: 4.8,
            destaque: true,
            tag: 'PREMIUM',
         },
         {
            id: 2,
            nome: 'Cama Ortopédica para Cães',
            descricao:
               'Cama ortopédica que oferece suporte adequado às articulações do seu cão, ideal para pets idosos ou com problemas articulares.',
            preco: 159.9,
            imagem: 'https://source.unsplash.com/random/600x400/?dog,bed',
            categoria: 'acessorios',
            estoque: 12,
            avaliacao: 4.7,
            tag: 'CONFORTO',
         },
         {
            id: 3,
            nome: 'Brinquedo Interativo para Gatos',
            descricao:
               'Brinquedo que estimula o instinto caçador do seu gato, mantendo-o entretido e ativo por horas.',
            preco: 45.9,
            imagem:
               'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
            categoria: 'brinquedos',
            estoque: 30,
            avaliacao: 4.5,
            destaque: true,
         },
         {
            id: 4,
            nome: 'Shampoo Hipoalergênico para Pets',
            descricao:
               'Shampoo suave e hipoalergênico, ideal para pets com pele sensível. Limpa profundamente sem causar irritações.',
            preco: 35.9,
            imagem:
               'https://images.unsplash.com/photo-1619140099965-06d74aeb0ca9?q=80&w=600&auto=format&fit=crop',
            categoria: 'higiene',
            estoque: 18,
            avaliacao: 4.9,
            tag: 'HIPOALERGÊNICO',
         },
         {
            id: 5,
            nome: 'Coleira Personalizada para Cães',
            descricao:
               'Coleira ajustável, resistente e confortável. Personalização com o nome do seu pet e seu contato.',
            preco: 29.9,
            imagem:
               'https://images.unsplash.com/photo-1567612529009-ded3bb0ef436?q=80&w=600&auto=format&fit=crop',
            categoria: 'acessorios',
            estoque: 22,
            avaliacao: 4.6,
            destaque: true,
         },
         {
            id: 6,
            nome: 'Caixa de Transporte para Pets',
            descricao:
               'Caixa de transporte segura e espaçosa, ideal para levar seu pet ao veterinário ou em viagens.',
            preco: 129.9,
            imagem:
               'https://images.unsplash.com/photo-1596758501354-9a09d34c5bb5?q=80&w=600&auto=format&fit=crop',
            categoria: 'acessorios',
            estoque: 8,
            avaliacao: 4.4,
         },
         {
            id: 7,
            nome: 'Comedouro Automático para Pets',
            descricao:
               'Dispensa ração automaticamente em horários programados. Ideal para quem passa muito tempo fora de casa.',
            preco: 199.9,
            imagem:
               'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=600&auto=format&fit=crop',
            categoria: 'alimentacao',
            estoque: 5,
            avaliacao: 4.9,
            tag: 'NOVIDADE',
         },
         {
            id: 8,
            nome: 'Ração Premium para Gatos',
            descricao:
               'Ração de alta qualidade, formulada especialmente para atender às necessidades nutricionais dos gatos.',
            preco: 75.9,
            imagem:
               'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=600&auto=format&fit=crop',
            categoria: 'alimentacao',
            estoque: 20,
            avaliacao: 4.8,
            destaque: true,
         },
         {
            id: 9,
            nome: 'Escova Massageadora para Pets',
            descricao:
               'Escova que remove pelos soltos e proporciona uma massagem relaxante para seu pet, estimulando a circulação sanguínea.',
            preco: 42.5,
            imagem:
               'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop',
            categoria: 'higiene',
            estoque: 15,
            avaliacao: 4.6,
         },
         {
            id: 10,
            nome: 'Arranhador para Gatos',
            descricao:
               'Arranhador vertical com design moderno, perfeito para seu gato afiar as unhas e se exercitar, preservando seus móveis.',
            preco: 89.9,
            imagem:
               'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop',
            categoria: 'brinquedos',
            estoque: 10,
            avaliacao: 4.7,
            tag: 'MAIS VENDIDO',
         },
         {
            id: 11,
            nome: 'Kit Brinquedos para Cães',
            descricao:
               'Kit com 4 brinquedos resistentes para cães, ideal para estimular a atividade física e mental do seu pet.',
            preco: 65.9,
            imagem:
               'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=600&auto=format&fit=crop',
            categoria: 'brinquedos',
            estoque: 18,
            avaliacao: 4.5,
         },
         {
            id: 12,
            nome: 'Bebedouro Fonte para Pets',
            descricao:
               'Bebedouro tipo fonte que mantém a água sempre fresca e em movimento, estimulando seu pet a beber mais água.',
            preco: 110.9,
            imagem:
               'https://images.unsplash.com/photo-1603622838446-0ebba741b82c?q=80&w=600&auto=format&fit=crop',
            categoria: 'acessorios',
            estoque: 7,
            avaliacao: 4.9,
            destaque: true,
            tag: 'ECONOMIA DE ÁGUA',
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
