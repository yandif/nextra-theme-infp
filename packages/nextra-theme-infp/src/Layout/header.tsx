import { observer } from '@legendapp/state/react';
import React from 'react';

import { cn } from '@/utils/utils';

export const Header = observer(() => {
  return (
    <div className="infp-header-container">
      <div
        className={cn(
          'infp-header-container-blur',
          'pointer-events-none absolute z-[-1] h-full w-full bg-white dark:bg-dark',
          'shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]',
          'contrast-more:shadow-[0_0_0_1px_#000] contrast-more:dark:shadow-[0_0_0_1px_#fff]',
        )}
      />
      <nav className="mx-auto flex h-[var(--infp-header-height)] max-w-[90rem] items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"></nav>{' '}
    </div>
  );
});

{
  /* <svg
  t="1697031941748"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="8184"
  data-spm-anchor-id="a313x.search_index.0.i11.43763a81tRjcR9"
  width="200"
  height="200">
  <path
    d="M441.131 746.831838c-46.687222 0-84.664463-38.153241-84.664463-85.054325 0-7.835095 6.311463-14.176232 14.110744-14.176232s14.110744 6.340114 14.110744 14.176232c0 31.258521 25.314408 56.702883 56.442975 56.702883 31.12959 0 56.442975-25.444362 56.442975-56.702883 0-7.835095 6.311463-14.176232 14.110744-14.176232s14.110744 6.340114 14.110744 14.176232C525.795462 708.678597 487.817199 746.831838 441.131 746.831838zM582.238438 746.831838c-46.687222 0-84.664463-38.153241-84.664463-85.054325 0-7.835095 6.311463-14.176232 14.110744-14.176232s14.110744 6.340114 14.110744 14.176232c0 31.258521 25.314408 56.702883 56.442975 56.702883s56.442975-25.444362 56.442975-56.702883c0-7.835095 6.311463-14.176232 14.110744-14.176232s14.110744 6.340114 14.110744 14.176232C666.903924 708.678597 628.92566 746.831838 582.238438 746.831838zM257.690307 484.579724a55.16 55.414 0 1 0 112.885951 0 55.16 55.414 0 1 0-112.885951 0ZM652.79318 484.579724a55.16 55.414 0 1 0 112.885951 0 55.16 55.414 0 1 0-112.885951 0ZM793.887316 753.918931c-2.122239 0-4.272107-0.470699-6.297137-1.494982l-56.442975-28.351442c-6.972488-3.515918-9.797706-12.016132-6.311463-19.021365 3.486244-6.977604 11.975202-9.857055 18.933364-6.340114l56.442975 28.351442c6.972488 3.515918 9.797706 12.016132 6.311463 19.021365C804.043163 751.039479 799.0691 753.918931 793.887316 753.918931zM850.344617 671.93643l-56.442975 0c-7.799281 0-14.110744-5.978903-14.110744-13.813999s6.311463-13.813999 14.110744-13.813999l56.442975 0c7.799281 0 14.110744 5.978903 14.110744 13.813999S858.143898 671.93643 850.344617 671.93643zM223.170659 753.918931c-5.181784 0-10.155847-2.879451-12.636227-7.835095-3.486244-7.005232-0.661025-15.504423 6.311463-19.021365l56.442975-28.351442c6.959186-3.515918 15.433818-0.636467 18.933364 6.340114 3.486244 7.005232 0.661025 15.504423-6.311463 19.021365l-56.442975 28.351442C227.442766 753.448231 225.292898 753.918931 223.170659 753.918931zM229.467796 671.93643l-56.442975 0c-7.799281 0-14.110744-5.978903-14.110744-13.813999s6.311463-13.813999 14.110744-13.813999l56.442975 0c7.799281 0 14.110744 5.978903 14.110744 13.813999S237.2681 671.93643 229.467796 671.93643zM1019.674566 569.634049c-6.969418-59.677497-19.385645-115.954705-36.791283-168.021201 3.388011-3.430988 6.197881-7.498443 7.549606-12.416227 36.51705-133.866856 48.464624-344.538522-17.390289-384.711677-7.950724-3.017591-17.84564-4.484945-30.260843-4.484945-69.272599 0-203.683829 48.036901-243.246098 62.766717-2.261403 0.848282-4.017315 2.372938-5.918531 3.710338-55.184367-22.864726-115.952658-35.522442-181.931386-35.522442-65.310539 0-125.354363 12.336412-179.929891 34.501229-1.454051-0.87898-2.651264-2.07517-4.289502-2.689125-39.562269-14.729816-173.973499-62.766717-243.246098-62.766717-12.416227 0-22.310119 1.467354-30.260843 4.484945C-11.897552 44.659123 0.050022 255.330789 36.567072 389.197645c0.982329 3.573221 2.737218 6.702348 4.850248 9.532682-17.841547 52.889196-30.62103 110.092453-37.723472 170.903722-37.923008 316.297593 225.772924 453.625111 507.989847 453.625111C792.240892 1023.25916 1057.597574 885.931641 1019.674566 569.634049zM942.505476 56.343719c3.36243 0 5.539925 0.249675 6.876302 0.470699 15.037817 16.46731 24.859058 132.677829-0.544374 262.091462C903.792513 226.11367 840.245049 151.702264 761.353814 101.7621 826.797377 79.580911 908.150573 56.343719 942.505476 56.343719zM77.618183 56.814418c1.336376-0.221024 3.513872-0.470699 6.876302-0.470699 33.857599 0 113.327999 22.57412 178.266071 44.456517-77.878208 48.872904-140.766693 121.432211-185.711305 212.0326C53.131591 185.889352 62.818786 73.020797 77.618183 56.814418zM895.749696 828.402988c-77.500626 87.799729-217.487595 138.153289-384.064977 138.153289-169.329949 0-305.656721-50.354583-383.157346-138.153289-57.309676-64.92477-79.242213-149.705885-66.978452-251.986778C96.762338 274.871969 257.689283 87.657496 511.684719 87.657496c243.566378 0 416.737642 187.214473 451.951059 488.758715C975.899539 678.697103 953.059371 763.478218 895.749696 828.402988z"
    fill="#272636"
    p-id="8185"
    data-spm-anchor-id="a313x.search_index.0.i12.43763a81tRjcR9"
    class=""></path>
</svg>; */
}
