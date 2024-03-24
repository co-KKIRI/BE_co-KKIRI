import { Controller, Post } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { ImageResponse } from '../dto/response/image.response';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('')
  async createUploadURL(): Promise<ImageResponse> {
    const uploadUrl = await this.imageService.createUploadURL();
    return new ImageResponse(uploadUrl);
  }
}
