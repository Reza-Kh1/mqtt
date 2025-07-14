import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    constructor(private readonly userService: UserService) { }

    public findPost() {
        const gog = this.userService.findAll()
        console.log(gog);
        
        return true
    }

}
