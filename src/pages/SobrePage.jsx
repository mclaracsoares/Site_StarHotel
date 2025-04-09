function SobrePage() {
  return (
    <div className="bg-white">
      {/* Seção Hero com imagem */}
      <section className="relative h-[60vh]">
        <img
          src="/images/hotel-banner.jpg"
          alt="Hotel Limoeiro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-playfair font-bold text-center px-4">
            Sobre o Hotel Limoeiro
          </h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Fundado em 2016 por <span className="font-semibold">Fabio Araújo</span>, o Hotel Limoeiro nasceu do desejo genuíno de proporcionar uma experiência única e acolhedora aos nossos visitantes.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Com um carinho especial pela cidade de Limoeiro e por seus encantos, nossa missão é criar um ambiente onde o <span className="text-wine-900 font-medium">conforto</span>, o <span className="text-wine-900 font-medium">bem-estar</span> e a <span className="text-wine-900 font-medium">tranquilidade</span> se encontram, oferecendo aos nossos hóspedes um refúgio perfeito para relaxar e se reconectar com o que realmente importa.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Venha viver momentos inesquecíveis e sentir a verdadeira essência de Limoeiro, com a certeza de que cada instante será repleto de conforto e carinho.
          </p>
        </div>
      </section>
    </div>
  );
}

export default SobrePage;
