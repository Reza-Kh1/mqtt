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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id/:pow')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [CreateUserDto] })
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
  @ApiOperation({ summary: 'Create users' })
  @ApiResponse({ status: 200, description: 'Create of users', type: [CreateUserDto] })
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto)
  }

}
