import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { Member } from 'src/entity/member.entity';
import { Repository } from 'typeorm';
// import { SocialLoginInfoDto } from './utils/socialLogin-info.dto';
// import { UsersService } from '../../users/users.service';
// import { Provider } from './utils/provider.enum';
// import { User } from '../../users/entities/users.entity';

@Injectable()
export class GoogleAuthenticationService {
  // constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}
  constructor(@InjectRepository(Member) private postRepository: Repository<Member>) {}
  // async validateAndSaveUser(socialLoginInfoDto: SocialLoginInfoDto): Promise<object | Member> {
  async validateAndSaveUser(socialLoginDto: SocialLoginDto) {
    // const { email, refreshToken } = socialLoginInfoDto;
    // 등록 시 검증 로직
    // const existingUser = await this.userService.findUserByEmail(email);
    // if (existingUser) {
    //   if (existingUser.socialProvider !== Provider.GOOGLE) {
    //     return {
    //       existingUser: existingUser,
    //       msg: '해당 이메일을 사용중인 계정이 존재합니다.',
    //     };
    //   } else {
    //     const updateUserWithRefToken: User = await this.userService.updateSocialUserRefToken(
    //       existingUser.id,
    //       refreshToken,
    //     );
    //     return updateUserWithRefToken;
    //   }
    // }
    // const newUser = await this.userService.createSocialUser(socialLoginInfoDto);
    // const updateUser = await this.userService.updateSocialUserInfo(newUser.id);
    // return updateUser;
    return { id: 1 };
  }
}


/**
 * 프론트에 요청할 일
 * 1. 버튼 눌렀을떄, http://localhost:8080/auth/google/login으로 요청을 보낸다.
 * 2. redirect로 http://localhost/auth/google/redirect 페이지를 만든다. (주소는 변경 가능)
 * 3. 만든 페이지에서 로그인 성공시, http://localhost:8080/auth/google/redirect?code=${code} 로 요청을 보낸다.
 * 
 * 서버에서
 * 4. 서버에서는 3번에서 온 요청을 바탕으로 검증해서 디비에 유저 정보가 있으면 그냥 반환하고, 없으면 저장하고 반환하는데, 이때, cookie가 내려간다.
 * 5. 
 */