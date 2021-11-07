import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

const LoggedIn = ({ session, user }) => {
  return (
    <div className={utilStyles.quickflex}>
      <div className={utilStyles.input}>
        <div>
          <span className="block mr-2 font-bold">
            {user.editor && <span className="text-lg">⭐️</span>}
            <Link href={`/profile`}>
              <a>{user.username}</a>
            </Link>
          </span>
          <span className="mr-2 font-bold">
            {session.user.email}
          </span>
        </div>
      </div>
      <button onClick={() => supabase.auth.signOut()} className="ml-2 bg-gray-100 rounded-lg shadow-sm">
        Log out
      </button>
    </div>
  )
}

export default LoggedIn;