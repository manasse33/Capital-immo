import { staticAssets } from '@/assets';

interface SiteLoaderProps {
  isVisible: boolean;
}

export default function SiteLoader({ isVisible }: SiteLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-700 ${
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="site-loader-backdrop absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,158,159,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_26%)]" />

      <div className="absolute left-[10%] top-[18%] h-28 w-28 rounded-full border border-white/10" />
      <div className="absolute bottom-[16%] right-[12%] h-48 w-48 rounded-full border border-white/10" />

      <div className="relative flex h-full items-center justify-center px-6">
        <div className="text-center">
          <div className="loader-logo-shell mx-auto mb-8">
            <img
              src={staticAssets.logo}
              alt="Capital Immo Group"
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-white/65">
            Capital Immo Group
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/72 md:text-base">
            Preparation de votre experience immobiliere.
          </p>

          <div className="mx-auto mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
            <div className="loader-progress h-full rounded-full bg-[#7A9E9F]" />
          </div>
        </div>
      </div>
    </div>
  );
}

