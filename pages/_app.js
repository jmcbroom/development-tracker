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

  const [editor, setEditor] = useState(false)
  
  async function getProfile() {
    try {
      const user = supabase.auth.user()
  
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`editor`)
        .eq('id', user.id)
        .single()
  
      if (error && status !== 406) {
        throw error
      }
  
      if (data) {
        setEditor(data.editor)
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <Layout session={session} setSession={setSession} editor={editor} >
      <Component {...pageProps} session={session} editor={editor} />
    </Layout>
  ) 
}

export default MyApp
