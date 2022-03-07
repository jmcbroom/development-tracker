import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './Footer';
import Header, { sections } from './Header';
import { siteTitle } from '../toolkit.config';

export default function Layout({ children }) {

  let [nav, showNav] = useState(false)

  return (
    <>

      {!nav && <Header {...{nav, showNav}} />}

      {nav && 
        <div className="absolute w-screen h-screen bg-ternblue p-3">
          <FontAwesomeIcon icon={faWindowClose} onClick={() => showNav(false)} className='h-6 absolute right-6 top-5 text-dkgray' />
          <div className="pt-14 text-4xl leading-12 px-12">
            {sections.map(s => (
              <Link href={s.href} key={s.href} >
                <h3 className="font-medium underline text-dkgray" onClick={() => showNav(false)}>{s.text}</h3>
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
