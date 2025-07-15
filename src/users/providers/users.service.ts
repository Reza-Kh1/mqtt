import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/post.user.dto';
/**
 * This is the user service that handles user logic.
 */
@Injectable()
export class UserService {
    /** * This is function for get all data*/
    public findAll() {
        console.log('its ok');

        return true
    }
    /** * This is function for create user data*/
    public createUser(createUserDto: CreateUserDto) {
        console.log(createUserDto);

        return 'hi'
    }
}
