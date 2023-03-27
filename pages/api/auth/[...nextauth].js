import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
    providers: [
        FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      async signIn(user, account, profile) {
        // You can customize the user object here
        return true
      },
    },
  })

  