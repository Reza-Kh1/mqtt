import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { UserService } from 'src/users/providers/users.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postsServices: PostsService, private readonly userService: UserService) { }
  @Get('/')
  public getUsers(
    // @Param() getUserParam: any,
    // @Query() getQuery: any,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // this.userService.findAll()
    this.postsServices.findPost()
    return 'hi bitch';
  }

}
