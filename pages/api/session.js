import { getServerSession } from "next-auth/next"
import { authOptions } from 'pages/api/auth/[...nextauth]'


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { user, accessToken } = session;

  // res.status(200).json({ username: user.username, accessToken });
  res.redirect(`http://localhost:54321/api/${accessToken}/${user.username}`)
}
