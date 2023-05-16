import { institutionType } from '../db/entities';
import { BaseRepository } from './base.repository';

class InstitutionTypeRepository extends BaseRepository<institutionType> {

    constructor() {
        super(institutionType)
    }

    create = (name: string): institutionType => {
        return this.repository.create({
            name: name
        })
    }

    findById = async (id: number): Promise<institutionType> => {
        return await this.repository.findOne({ where: { id: id } })
    }

    findByName = async (name: string): Promise<institutionType> => {
        return await this.repository.findOne({ where: { name: name } })
    }
}

export default new InstitutionTypeRepository();