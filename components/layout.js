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
import Header from './Header'

export const siteTitle = 'Detroit Development Tracker'

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

        <main className="mx-2 md:mx-4 lg:mx-8" style={{maxWidth: 900}}>
          {children}
        </main>
      </div>
      <footer className={homeStyles.login}>
        {session ? <LoggedIn {...{session, user}} /> : <LoggedOut />}
      </footer>
      <footer className={homeStyles.footer}>
        <a href="https://github.com/jmcbroom/development-tracker">GitHub</a>
        <span>&copy; {new Date().getFullYear()}</span>
        <a href="https://airtable.com/shrOB8DAdp3lyzOJ0" target="_blank" rel="noreferrer">Contact</a>
      </footer>
    </>
  )
}
