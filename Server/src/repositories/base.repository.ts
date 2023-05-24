import { DBModel } from "../db/DBModel";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

export class BaseRepository<E extends ObjectLiteral> {

    repository: Repository<E>;

    constructor(entity: EntityTarget<E>) {
        this.repository = DBModel.getRepository(entity)
    }

    async findAll(select: {}): Promise<E[]> {
        return await this.repository.find({ select: select })
    }

    async findWhere(query: {}): Promise<E> {
        return await this.repository.findOne({ where: query })
    }


    async save(newEntiy: E) {
        await this.repository.save(newEntiy)
    }
}