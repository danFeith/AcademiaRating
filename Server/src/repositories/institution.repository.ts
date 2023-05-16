import { institution, institutionType } from '../db/entities';
import { BaseRepository } from './base.repository';

class InstitutionRepository extends BaseRepository<institution> {


    constructor() {
        super(institution)
    }

    findByName = async (name: string): Promise<institution> => {
        return await this.repository.findOne({ where: { name: name } })
    }

    create = (institutionProps: { name: string, address: string, institutionType: institutionType }): institution => {
        return this.repository.create({
            name: institutionProps.name,
            address: institutionProps.address,
            institutionType: institutionProps.institutionType
        })
    }
}

export default new InstitutionRepository();