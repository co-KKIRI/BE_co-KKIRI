import { IsBoolean } from 'class-validator';

export class PatchMyPageVisibleProfileRequest {
  @IsBoolean()
  isVisibleProfile: boolean;

  constructor(isVisibleProfile: boolean) {
    this.isVisibleProfile = isVisibleProfile;
  }
}
