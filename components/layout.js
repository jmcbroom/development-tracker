import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import homeStyles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'
import Header, {sections} from './Header'

export const siteTitle = 'Detroit Development Tracker'

let footerStyle = "text-xl hover:underline my-2"

export default function Layout({ session, setSession, editor, children, home, user }) {
  return (
    <>
      <div>

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

        <main className="mx-auto mb-4" style={{ maxWidth: 960 }}>
          {children}
        </main>
      </div>
      {/* <footer className={homeStyles.login}>
        {session ? <LoggedIn {...{session, user}} /> : <LoggedOut />}
      </footer> */}
      <footer className={homeStyles.footer}>
        <div className="flex items-top justify-between">
        <div>
          <h2 className="text-xl mb-8">Detroit Development Tracker</h2>
          <button className="rounded-full bg-yellow-400 px-4 py-2 border-none">Contact us</button>
        </div>
        <div className="w-1/2 grid grid-cols-2 grid-rows-3 grid-flow-col">
          {sections.map(s => (
            <Link href={s.href} key={s.href}>
              <span className="text-xl hover:underline mb-2">{s.text}</span>
            </Link>
          ))}
        </div>
        </div>
        <p className="mt-12 font-light text-sm">Lorem ipsum legal line {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}
