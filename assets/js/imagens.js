// Script global para garantir que as imagens sejam exibidas
document.addEventListener('DOMContentLoaded', function () {
   // Configurar um observador para verificar quando as imagens aparecem no viewport
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         // Se a imagem estiver visível
         if (entry.isIntersecting) {
            const img = entry.target

            // Verificar se a imagem já foi carregada
            if (!img.complete) {
               img.addEventListener('error', function () {
                  this.onerror = null
                  this.src =
                     'https://via.placeholder.com/600x400/f8f9fa/dddddd?text=PetAmigo'
               })
            }

            // Parar de observar esta imagem
            observer.unobserve(img)
         }
      })
   })

   // Observar todas as imagens de produtos
   document
      .querySelectorAll(
         '.produto-img img, .produto-imagem, .carrinho-item-imagem'
      )
      .forEach((img) => {
         observer.observe(img)
      })
})
