import { roles } from '../db/entities';
import { In } from 'typeorm';
import { BaseRepository } from './base.repository';

class RoleRepository extends BaseRepository<roles> {

    constructor() {
        super(roles)
    }

    findByNames = async (roleNames: string[]): Promise<roles[]> => {
        return await this.repository.findBy({
            name: In(roleNames)
        })
    }

    findById = async (id: number): Promise<roles[]> => {
        return await this.repository.findBy({
            id: id
        })
    }

    getAllRolesNames = async (): Promise<roles[]> => {
        return await this.repository.find({ select: { name: true } })
    }
}

export default new RoleRepository();