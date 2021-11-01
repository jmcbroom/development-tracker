import Account from "../components/Account"
import Layout from "../components/layout"

const ProfilePage = (props) => {

  let { session } = props
  return (
    <>
      {session && <Account session={session}/>}
    </>
  )
}

export default ProfilePage;