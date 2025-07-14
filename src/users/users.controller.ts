import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/post.user.dto';
import { UserService } from './providers/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id/:pow')
  public getUsers(
    @Param() getUserParam: any,
    @Query() getQuery: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    this.userService.findAll()
    console.log(getUserParam);
    console.log(getQuery);
    console.log(page);
    return 'hi bitch';
  }

  @Post('/')
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto)
  }
  
}
