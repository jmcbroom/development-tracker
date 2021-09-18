import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import homeStyles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'

export const siteTitle = 'development-tracker'

async function logout() {
  const { error } = await supabase.auth.signOut()
} 

export default function Layout({ session, setSession, editor, children, home }) {

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
          <span>{session ? `Logged in as ${session.user.email}` : <Auth />}</span>

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
      <footer className={homeStyles.footer}>
        {new Date().getFullYear()}
        {editor && `You can edit!`}
        {session && <button onClick={() => logout()}>Log out</button>}
      </footer>
    </>
  )
}
