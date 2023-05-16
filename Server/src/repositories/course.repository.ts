import { course, degree, institution, lecturer } from '../db/entities';
import { BaseRepository } from './base.repository';

class CourseRepository extends BaseRepository<course> {


    constructor() {
        super(course)
    }


    create = (courseProps: { id: number, name: string, degree: degree, institution: institution, lecturers: lecturer[] }): course => {
        return this.repository.create({
            id: courseProps.id,
            name: courseProps.name,
            degree: courseProps.degree,
            institution: courseProps.institution,
            lecturer: courseProps.lecturers
        })
    }
}

export default new CourseRepository();