import React from "react";
import LoggedOut from "../components/LoggedOut";
import LoggedIn from "../components/LoggedIn";

const AdminPage = ({ session, user }) => {
  console.log(user)
  
  return (
    <div>
      {session ? <LoggedIn {...{session, user}} /> : <LoggedOut />}
    </div>
  )
}

export default AdminPage;