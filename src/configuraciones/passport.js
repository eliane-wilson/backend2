import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import userModel from "../models/userModel.js";

passport.use("github", new GitHubStrategy(
    {
      clientID: "Ov23liVNIdSnMc11Fi5y",
      clientSecret: "9c7965f2285e7698398ab87f0e65eaea66fa1f21",
      callbackURL: "http://localhost:8080/api/sessions/github-login"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile._json.email;

        let user = await userModel.findOne({ email });

        if (!user) {
          user = await userModel.create({
            first_name: profile._json.name || profile.username,
            last_name: "GitHubUser",
            age: 18,
            email: email,
            password: "githubLogin"
          });
        }

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;