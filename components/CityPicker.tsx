'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Select } from './ui/select';
import { useMemo, useState } from 'react';

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
    <label className="flex items-center space-x-2 text-sm font-medium">
      <span>{t('cityPicker')}</span>
      <Select
        value={value}
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
    </label>
  );
}
