import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'
import dbConnect from '@utils/dbConnect'
import Users from '@models/Users'
import Invitations from '@models/Invitations'
import CRUD from '@server/CRUD'
// import Auth0Provider from 'next-auth/providers/auth0'
import GoogleProvider from 'next-auth/providers/google'
import VkProvider from 'next-auth/providers/vk'
// import EmailProvider from 'next-auth/providers/email'
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

const defaultUserProps = {
  role: 'client',
  birthday: null,
  phone: null,
  whatsapp: null,
  viber: null,
  telegram: null,
  gender: null,
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorizationUrl:
      //   'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
    async session({ session, token }) {
      console.log(`session2`, session)
      console.log(`token`, token)
      const { user } = session
      await dbConnect()
      const result = await Users.find({
        email: user.email,
      })
      // Если аватарка пользователя не сохранена в cloudinary, то сохраняем в cloudinary и обнояем данные пользователя
      if (
        result[0].image &&
        !result[0].image.includes('https://res.cloudinary.com')
      ) {
        await fetch(
          'https://api.cloudinary.com/v1_1/escalion-ru/image/upload',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
              file: result[0].image,
              upload_preset: 'obnimisharik_users',
              public_id: result[0]._id,
            }),
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            if (data.secure_url !== '') {
              await CRUD(Users, {
                method: 'PUT',
                query: { id: result[0]._id },
                body: { image: data.secure_url },
              })
              user.image = data.secure_url
            }
          })
          .catch((err) => console.error(err))
      } else {
        user.image = result[0].image
      }

      user._id = result[0]._id
      user.role = result[0].role
      user.name = result[0].name
      user.phone = result[0].phone
      user.whatsapp = result[0].whatsapp
      user.viber = result[0].viber
      user.telegram = result[0].telegram
      user.gender = result[0].gender
      user.birthday = result[0].birthday

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
            user.role = invitation[0].role
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
  // database: process.env.MONGODB_URI,
  // adapter: TypeORMLegacyAdapter(process.env.MONGODB_URI)
  // adapter: MongoDBAdapter({
  //   db: (await clientPromise).db('obnimisharik'),
  // }),
})
