import { defaultLocale } from '@/i18n';

export default function RootPage() {
  const url = `/${defaultLocale}`;
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
        <title>Cafe Trente-Neuf</title>
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace(${JSON.stringify(url)});`,
          }}
        />
        <p style={{ fontFamily: 'system-ui', padding: 24 }}>
          Redirecting to <a href={url}>{url}</a>...
        </p>
      </body>
    </html>
  );
}
