interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export default function PageHero({
  eyebrow,
  title,
  description,
  align = 'center',
}: PageHeroProps) {
  const alignment = align === 'left' ? 'text-left' : 'text-center';
  const contentWidth = align === 'left' ? 'max-w-3xl' : 'max-w-4xl';

  return (
    <section className="page-hero pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="hero-orb left-[-4rem] top-16 size-40 md:size-56" />
      <div className="hero-orb bottom-[-5rem] right-[10%] size-56 md:size-72" />
      <div className="hero-orb right-[-2rem] top-10 size-24 md:size-32" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${contentWidth} ${align === 'left' ? '' : 'mx-auto'} ${alignment}`}>
          <span className="section-kicker mb-6">{eyebrow}</span>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/78 md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

