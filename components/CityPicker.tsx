'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Select } from './ui/select';
import { useMemo, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface CityPickerProps {
  locale: string;
  cities: { slug: string; name: string }[];
}

export function CityPicker({ locale, cities }: CityPickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navbar');
  const currentCitySlug = pathname?.split('/').filter(Boolean)[1];
  const [value, setValue] = useState(currentCitySlug ?? cities[0]?.slug ?? '');

  const options = useMemo(() => cities.map((city) => ({ value: city.slug, label: city.name })), [cities]);

  return (
    <label className="group relative flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg">
      <span className="inline-flex items-center gap-2 text-purple-600">
        <MapPin className="h-4 w-4" />
        {t('cityPicker')}
      </span>
      <div className="relative flex-1">
        <Select
          value={value}
          className="h-9 w-full cursor-pointer border-none bg-transparent px-0 pr-8 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(event) => {
            const slug = event.target.value;
            setValue(slug);
            const segments = pathname?.split('/') ?? [];
            if (segments.length >= 3) {
              segments[2] = slug;
              router.push(segments.join('/'));
            } else {
              router.push(`/${locale}/city/${slug}`);
            }
          }}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-500 transition group-hover:translate-y-[-55%]" />
      </div>
    </label>
  );
}
