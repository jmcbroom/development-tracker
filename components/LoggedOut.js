import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import utilStyles from '../styles/utils.module.css'

export default function LoggedOut() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email }, { redirectTo: `/` })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={utilStyles.quickflex}>
      <div className={utilStyles.input}>
      <span className="mr-2">Sign up:</span>
        <input
          type="email"
          className="mr-2"
          
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={utilStyles.input}
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          disabled={loading}
        >
          <span>{loading ? 'Loading' : 'Send magic link'}</span>
        </button>
      </div>
    </div>
  )
}