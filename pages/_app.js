import '@/styles/globals.css';
// import 'react-folder-tree/dist/style.css';
import '@/styles/files.scss';
import { SessionProvider } from "next-auth/react"
import "@fontsource/manrope";
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo title="scatteredNote" description="A Simple ui to grab contents and take note easily: organize and query your note intelligently."
        openGraph={{
          url: 'https://www.scatterednote.com/',
          title: 'ScatteredNote',
          description: 'A Simple ui to grab contents and take note easily: organize and query your note intelligently.',
          images: [{ url: 'https://www.scatterednote.com/logox.png' },
          ],
          siteName: 'scatterednote',
        }}
        twitter={{
          handle: '@scatterednote',
          site: '@scatterednote',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </SessionProvider >
  );
}
