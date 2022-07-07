import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthProvider, User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async validateOAuthLogin(
    userData: any,
    provider: AuthProvider,
  ): Promise<string> {
    try {
      let user: User = await this.userService.findOne({
        email: userData.email,
      });
      if (!user) {
        user = new User();
        user.email = userData.email;
        user.name = userData.name;
        user.authProvider = provider;
        user = await this.userService.create(user);
      }
      if (!user.id) {
        console.log(user);
        throw new InternalServerErrorException(
          'This email is already registered',
        );
      }
      const payload = {
        ...user,
        provider,
      };
      const jwt: string = sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
