import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const isStaticExport = process.env.STATIC_EXPORT === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePathValue = configuredBasePath ?? (repositoryName ? `/${repositoryName}` : '');
const basePath = isStaticExport ? basePathValue || undefined : undefined;

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    }
  },
  ...(isStaticExport
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined
      }
    : {})
};

export default withNextIntl(nextConfig);
