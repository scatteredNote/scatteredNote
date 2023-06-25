import { getServerSession } from "next-auth/next"
import { getToken, encode } from "next-auth/jwt"
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

  const { user } = session;
  const token = await getToken({ req, res });
  if (!token) {
    // Handle the case where the token is not available
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const accessToken = await encode({ token: token, secret: process.env.NEXTAUTH_SECRET });
  // res.status(200).json({ username: user.username, accessToken });
  res.redirect(`http://localhost:54321/api/${accessToken}/${user.username}`)
}
