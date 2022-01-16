import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export const siteTitle = 'Detroit Development Tracker'

export default function Layout({ session, setSession, editor, children, home, user }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Tracking development in Detroit, Michigan."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  )
}
