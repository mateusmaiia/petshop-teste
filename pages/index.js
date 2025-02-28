import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ProdutoCard from '../components/ProdutoCard'
import { getProdutos } from '../lib/api'

export default function Home({ produtosIniciais }) {
   const [produtos, setProdutos] = useState(produtosIniciais)

   return (
      <Layout>
         <Head>
            <title>Minha Loja - Página Inicial</title>
            <meta
               name='description'
               content='Loja virtual com os melhores produtos'
            />
         </Head>

         <section className='produtos-destaque'>
            <div className='container'>
               <h2>Produtos em Destaque</h2>

               <div className='grid-produtos'>
                  {produtos.length > 0 ? (
                     produtos.map((produto) => (
                        <ProdutoCard key={produto.id} produto={produto} />
                     ))
                  ) : (
                     <p>Nenhum produto encontrado</p>
                  )}
               </div>
            </div>
         </section>
      </Layout>
   )
}

// Buscar dados no servidor
export async function getServerSideProps() {
   const produtos = await getProdutos()

   return {
      props: {
         produtosIniciais: produtos,
      },
   }
}
