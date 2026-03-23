import Hero from '../sections/Hero';
import BiensEnVedette from '../sections/BiensEnVedette';
import ServicesSection from '../sections/ServicesSection';
import ChiffresCles from '../sections/ChiffresCles';
import Temoignages from '../sections/Temoignages';
import CTASection from '../sections/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <BiensEnVedette />
      <ServicesSection />
      <ChiffresCles />
      <Temoignages />
      <CTASection />
    </main>
  );
}
