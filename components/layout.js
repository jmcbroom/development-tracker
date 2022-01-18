import { faWindowClose, faXRay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link';
import Footer from './Footer'
import Header, { sections } from './Header'

export const siteTitle = 'Detroit Development Tracker'

export default function Layout({ session, setSession, editor, children, home, user }) {

  let [nav, showNav] = useState(false)

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

      {!nav && <Header {...{nav, showNav}} />}

      {nav && 
        <div className="absolute w-screen h-screen bg-ternblue p-3">
          <FontAwesomeIcon icon={faWindowClose} onClick={() => showNav(false)} className='h-6 absolute right-6 top-5 text-dkgray' />
          <div className="pt-20 text-4xl leading-12 px-12">
            {sections.map(s => (
              <Link href={s.href} key={s.href}>
                <h3 className="font-medium underline text-dkgray">{s.text}</h3>
              </Link>
            ))}
          </div>
        </div>
      }

      {!nav && <main>
        {children}
      </main>}

      {!nav && <Footer />}
    </>
  )
}
