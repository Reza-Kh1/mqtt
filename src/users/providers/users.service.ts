import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/post.user.dto';
@Injectable()
export class UserService {
    public findAll() {
        console.log('its ok');
        
        return true
    }

    public createUser(createUserDto:CreateUserDto){
        console.log(createUserDto);
        
        return 'hi'
    }
}
