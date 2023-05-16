import { lecturer } from '../db/entities';
import { BaseRepository } from './base.repository';

class lecturerRepository extends BaseRepository<lecturer> {


    constructor() {
        super(lecturer)
    }


    create = (lecturerProps: { name: string }): lecturer => {
        return this.repository.create({
            name: lecturerProps.name
        })
    }
}

export default new lecturerRepository();