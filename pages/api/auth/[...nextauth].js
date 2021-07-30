import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '@utils/dbConnect'
import Users from '@models/Users'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async (session, user) => {
      await dbConnect()
      const result = await Users.find({
        email: user.email,
      })
      if (result && result.length === 1) {
        session.user.role = result[0].role
      } else {
        session.user.role = 'client'
      }
      // session.user.result = result

      return Promise.resolve(session)
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
})
