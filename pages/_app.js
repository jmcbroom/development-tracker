import Layout from '../components/layout'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

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
      <Component {...pageProps} session={session} editor={user.editor} user={user}/>
    </Layout>
  ) 
}

export default MyApp
