import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

const LoggedIn = ({ session, user }) => {
  return (
    <div className={utilStyles.quickflex}>
      <div className={utilStyles.input} style={{ color: "#444" }}>
        <div>

          <span style={{ marginRight: `.5em`, fontWeight: 700, display: 'block' }}>
            {user.editor && <span style={{ fontSize: 12 }}>⭐️</span>}
            <Link href={`/profile`}>
              <a>{user.username}</a>
            </Link>
          </span>
          <span style={{ marginRight: `.5em`, fontWeight: 700 }}>
            {session.user.email}
          </span>
        </div>
      </div>
      <button onClick={() => supabase.auth.signOut()} className={utilStyles.input} style={{ marginLeft: `.25rem` }}>
        Log out
      </button>
    </div>
  )
}

export default LoggedIn;