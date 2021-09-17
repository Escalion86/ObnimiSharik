import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '@utils/dbConnect'
import Users from '@models/Users'
import Invitations from '@models/Invitations'

const defaultUserProps = {
  role: 'client',
  birthday: null,
  phone: null,
  whatsapp: null,
  updatedAt: Date.now(),
  lastActivityAt: Date.now(),
  lastAutorizationAt: Date.now(),
}

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
      session.user.whatsapp = result[0].whatsapp
      session.user.birthday = result[0].birthday
      session.user._id = result[0]._id
      // console.log(`result[0]`, result[0])
      if (result) {
        if (result[0].role === 'client') {
          const invitation = await Invitations.find({
            email: user.email,
            status: 'created',
          })

          if (invitation && invitation.length === 1) {
            // Ели пользователь впервые зашел, но есть приглашение то создаем пустую учетку и указываем роль в приглашении
            await Users.findOneAndUpdate(
              { email: user.email },
              {
                ...defaultUserProps,
                role: invitation[0].role,
              }
            )
            await Invitations.findOneAndUpdate(
              { email: user.email, status: 'created' },
              { status: 'confirmed', updatedAt: Date.now() }
            )
            session.user.role = invitation[0].role
          } else {
            // Если пользователь зашел, но небыло приглаения то создаем пустую учетку с ролью client
            await Users.findOneAndUpdate(
              { email: user.email },
              defaultUserProps
            )
          }
          // session.user.role = 'client'
          // session.user.phone = 0
        } else {
          // Если пользователь авторизован, то обновляем только время активности
          await Users.findOneAndUpdate(
            { email: user.email },
            { lastActivityAt: Date.now(), lastAutorizationAt: Date.now() }
          )
        }
      }
      return Promise.resolve(session)
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
})
