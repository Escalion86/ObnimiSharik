import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '@utils/dbConnect'
import Users from '@models/Users'
import UsersInvitations from '@models/UsersInvitations'

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
      session.user.role = result[0].role
      session.user.phone = result[0].phone
      console.log(`result`, result)
      if (result && result[0].role === 'client') {
        // } else {
        const invitation = await UsersInvitations.find({
          email: user.email,
          status: 'created',
        })
        console.log(`invitation`, invitation)
        if (invitation && invitation.length === 1) {
          await Users.findOneAndUpdate(
            { email: user.email },
            { role: invitation[0].role }
          )
          await UsersInvitations.findOneAndUpdate(
            { email: user.email, status: 'created' },
            { status: 'confirmed' }
          )
          session.user.role = invitation[0].role
        }
        // session.user.role = 'client'
        // session.user.phone = 0
        // const user = await Users.findOneAndUpdate(
        //   { email: session.user.email },
        //   { role: 'client', phone: 0 }
        // )
        // console.log(`user`, user)
      }
      // session.user.result = result

      return Promise.resolve(session)
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
})
