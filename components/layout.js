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

export const siteTitle = 'development-tracker'

let sections = [
  {
    href: `/map`,
    text: `Map`
  },
  {
    href: `/projects`,
    text: `List`
  },
  {
    href: `/reporter`,
    text: `Report`
  },
  {
    href: `/meetings`,
    text: `Calendar`
  }
]

export default function Layout({ session, setSession, editor, children, home, user }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
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

        <header className={styles.header}>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{siteTitle}</a>
            </Link>
          </h2>
          <div>
            {sections.map(s => (
              <span key={s.text} style={{margin: `0em .5em`, fontWeight: 700}}><Link href={s.href} >{s.text}</Link></span>
            ))}
          </div>
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}

      </div>
      <footer className={homeStyles.login}>
        {session ? <LoggedIn {...{session, user}} /> : <LoggedOut />}
      </footer>
      <footer className={homeStyles.footer}>
        <a href="https://github.com/jmcbroom/development-tracker">GitHub</a>
        <span>Hello, it's {new Date().getFullYear()}</span>
        <a href="https://airtable.com/shrOB8DAdp3lyzOJ0" target="_blank">Contact</a>
      </footer>
    </>
  )
}
