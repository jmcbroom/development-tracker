import Layout from '../components/layout'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Script from 'next/script'


function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const [user, setUser] = useState({editor: false})
  
  async function getProfile() {
    try {
      const user = supabase.auth.user()
  
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`editor, username`)
        .eq('id', user.id)
        .single()
  
      if (error && status !== 406) {
        throw error
      }
  
      if (data) {
        setUser(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  useEffect(() => {
    session && getProfile()
  }, [session])

  return (
    <Layout session={session} setSession={setSession} user={user} editor={user.editor} >
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4DDN1CY2GZ`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4DDN1CY2GZ');
        `}
      </Script>
      <Component {...pageProps} session={session} editor={user.editor} user={user}/>
    </Layout>
  ) 
}

export default MyApp
