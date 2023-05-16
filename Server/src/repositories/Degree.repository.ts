import { degree, institution } from '../db/entities';
import { BaseRepository } from './base.repository';

class DegreeRepository extends BaseRepository<degree> {


    constructor() {
        super(degree)
    }


    findByName = async (name: string): Promise<degree> => {
        return await this.repository.findOne({ where: { name: name } })
    }


    create = (degreeProps: { name: string, institution: institution }): degree => {
        return this.repository.create({
            name: degreeProps.name,
            institution: degreeProps.institution,
            courses: []
        })
    }
}

export default new DegreeRepository();