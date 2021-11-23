import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountService } from "./account.service";
import { User } from "../utils/entities/user.entity";
import { LoginDTO, UserDTO } from "../utils/dto/user.dto";

@Controller('account')
export class AccountController {
    constructor(private _accountService: AccountService) {}

    /**
     * control the input data, and create a new user account
     *
     * @param {UserDTO} body -> new account data
     * @return Object -> successful or error response
     */
    @Post('/createAccount')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
    createUserAccountController(@Body() body: UserDTO): object {

        //try to create a new user account
        return this._accountService.createUserAccount(body).then((new_id: number | null) => {
            //if the return type is an number (which means the account was successfully created) ->
            //return successful message, other way, error message
            return new_id ?
                { res: new_id, msg: 'Account created !', status: HttpStatus.CREATED } :
                { msg: 'Error when creating new account', status: HttpStatus.BAD_REQUEST }
        });
    }

    /**
     * control the given the data and log the user
     *
     * @param {LoginDTO} body -> data for account identification
     * @return Object -> user account if found, error message otherwise
     */
    @Post('/login')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
    loginController(@Body() body: LoginDTO): object {

        //try to find the corresponding account
        return this._accountService.login(body.email, body.password).then((user: User | null) => {
            //if an account is founded, return the account with successful message, error message on the other way
            return user ?
                { res: user, msg: 'Connected !', status: HttpStatus.FOUND } :
                { msg: 'Account not found', status: HttpStatus.NOT_FOUND };
        });
    }

}
