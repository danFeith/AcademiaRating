import authConfig from '../config/auth.config';
import { refreshToken, users } from '../db/entities';
import { v4 as uuidv4 } from 'uuid'
import { BaseRepository } from './base.repository';

class RefreshTokenRepository extends BaseRepository<refreshToken> {

    constructor() {
        super(refreshToken)
    }

    createToken = async (user: users) => {
        const expiredAt: Date = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + authConfig.jwtRefreshExpiration);

        const _token = uuidv4()

        const newRefreshToken: refreshToken = this.createRefreshToken(_token, user.id, expiredAt, user)

        await this.save(newRefreshToken)
        return newRefreshToken.token;
    };

    verifyExpiration = (token: refreshToken) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };

    getRefreshToken = async (token: string): Promise<refreshToken> => {
        return await this.repository.findOne({ where: { token: token }, relations: { user: true } })
    }

    createRefreshToken = (token: string, id: number, expiryDate: Date, user: users): refreshToken => {
        return this.repository.create({
            token: token,
            id: id,
            expiryDate: expiryDate,
            user: user
        })
    }

    deleteById = async (id: number) => {
        await this.repository.delete({ id: id })
    }
}

export default new RefreshTokenRepository();