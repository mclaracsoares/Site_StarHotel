import React from 'react'

function GaleriaPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-12">
        Galeria de Fotos
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Em breve, adicionaremos mais fotos dos nossos quartos e instalações.
      </p>
      
      {/* Estrutura básica para a galeria - substitua com suas imagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exemplo de item - Adicione seus itens aqui */}
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
          Imagem 1 (placeholder)
        </div>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
          Imagem 2 (placeholder)
        </div>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
          Imagem 3 (placeholder)
        </div>
        {/* Adicione mais divs para mais imagens */}
      </div>
    </div>
  )
}

export default GaleriaPage 