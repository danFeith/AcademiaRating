import { users } from '../db/entities';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<users> {

    constructor() {
        super(users)
    }

    create = (username: string, email: string, password: string): users => {
        return this.repository.create({
            username: username,
            email: email,
            password: password
        })
    }

    findById = async (id: number): Promise<users> => {
        return await this.repository.findOne({ where: { id: id }, relations: { roles: true } })
    }

    findByUsername = async (username: string): Promise<users> => {
        return await this.repository.findOne({ where: { username: username }, relations: { roles: true } })
    }

    findByEmail = async (email: string): Promise<users> => {
        return await this.repository.findOne({ where: { email: email }, relations: { roles: true } })
    }

}

export default new UserRepository();