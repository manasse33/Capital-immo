import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CarteBien from '../components/CarteBien';
import { getBiensVedette } from '../data/biens';

export default function BiensEnVedette() {
  const biensVedette = getBiensVedette();

  return (
    <section className="bg-[#7A9E9F]/10 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-script text-2xl text-[#7A9E9F]">Nos sélections</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D354E] mt-2">
            Nos biens en vedette
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Découvrez notre sélection de biens d'exception, soigneusement choisis pour leur qualité et leur emplacement privilégié.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {biensVedette.map((bien) => (
            <CarteBien key={bien.id} bien={bien} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0D354E] text-white font-semibold rounded-lg hover:bg-[#0D354E]/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Voir tous nos biens
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
