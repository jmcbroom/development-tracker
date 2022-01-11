import { supabase } from "../../utils/supabaseClient";

export default async function getUser(req, res) {
  const user = await supabase.auth.user();
  console.log(user)
  return res.status(200).json({ user: user });
}
