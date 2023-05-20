import '@/styles/globals.css';
// import 'react-folder-tree/dist/style.css';
import '@/styles/files.scss';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
     <Component {...pageProps} />
    </SessionProvider >
  ) ;
}
