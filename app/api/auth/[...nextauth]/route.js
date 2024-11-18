import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions ={
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET, 
    debug : true,
    pages : {
        signIn : "/",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        }
    }
};


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
