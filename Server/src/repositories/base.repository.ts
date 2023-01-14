import { DBModel } from "../db/DBModel";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

export class BaseRepository<E extends ObjectLiteral> {

    repository: Repository<E>;

    constructor(entity: EntityTarget<E>) {
        this.repository = DBModel.getRepository(entity)
    }

    async save(newEntiy: E) {
        await this.repository.save(newEntiy)
    }
}