import { institution, institutionType } from '../db/entities';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<institution> {


    constructor() {
        super(institution)
    }


    create = (institutionProps: { name: string, address: string, institutionType: institutionType }): institution => {
        return this.repository.create({
            name: institutionProps.name,
            address: institutionProps.address,
            institutionType: institutionProps.institutionType
        })
    }
}

export default new UserRepository();