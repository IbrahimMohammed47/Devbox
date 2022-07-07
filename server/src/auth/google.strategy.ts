import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './service/auth.service';
import { Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/user/models/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}:${process.env.PORT}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails } = profile;
      const userData = {
        email: emails[0].value,
        name: (name.givenName + ' ' + name.familyName).trim(),
      };

      const jwt: string = await this.authService.validateOAuthLogin(
        userData,
        AuthProvider.GOOGLE,
      );

      done(null, { userData, jwt });
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
