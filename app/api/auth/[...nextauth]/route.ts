import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // ここで実際の認証ロジックを実装します
        // 例: データベースチェック、外部APIコール等
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin", email: "admin@example.com", role: "admin" }
        } else if (credentials?.username === "user" && credentials?.password === "password") {
          return { id: "2", name: "User", email: "user@example.com", role: "user" }
        } else if (credentials?.username === "manager" && credentials?.password === "password") {
          return { id: "3", name: "Manager", email: "manager@example.com", role: "manager" }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        //  session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }