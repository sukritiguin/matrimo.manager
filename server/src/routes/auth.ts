// src/routes/authRoutes.ts
import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  // Callback route for Google OAuth
  fastify.get("/login/google/callback", async (req, reply) => {
    try {
      // Get the access token from the authorization code
      const { token } =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

      // Fetch the user's profile information from Google
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      ).then((res) => res.json());

      // Check if the user already exists in the database
      let user = await fastify.prisma.user.findUnique({
        where: { email: userInfo.email },
      });

      // If the user doesn't exist, create a new user
      if (!user) {
        user = await fastify.prisma.user.create({
          data: {
            email: userInfo.email,
            googleId: userInfo.id,
            verified: true, // Mark as verified since it's from Google
          },
        });
      }

      // Generate a JWT for the user
      const jwt = fastify.jwt.sign({ userId: user.id });

      // Set the JWT in a cookie or return it in the response
      reply.setCookie("token", jwt, { httpOnly: true, path: "/" });
      reply.send({ message: "Logged in with Google.", user });
    } catch (err) {
      reply.status(500).send({ message: "Google OAuth failed.", error: err });
    }
  });

  // Route for Google OAuth login initiation
  // fastify.get("/login/google", async (req, reply) => {
  //   // Redirect the user to Google's OAuth consent screen
  //   reply.redirect(fastify.googleOAuth2.generateAuthorizationUri(req));
  // });
}
