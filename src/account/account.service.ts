import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../utils/entities/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "../utils/dto/user.dto";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private usersEntityRepository: Repository<User>,
    ) {}

    /**
     * Create a new user account
     *
     * @async
     * @param {UserDTO} user -> the new account data
     * @return Promise<number> -> new account id (for validation)
     */
    async createUserAccount(user: UserDTO): Promise<number> {

        // insert into the "user" table the new account
        const createAccount =  await this.usersEntityRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({...user})
            .execute();

        //return the new created account id
        return createAccount.raw.insertId;
    }

    /**
     * find the user account for the given data
     *
     * @async
     * @param {string} email -> user email
     * @param {string} password -> user password
     * @return Promise<User | null> -> the founded account or null if not found
     */
    async login(email: string, password: string): Promise<User | null> {
        //get the user where the email and password match
        return await this.usersEntityRepository.findOne({ where: { email: email, password: password } });
    }
}
