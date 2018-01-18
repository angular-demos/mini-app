import {PostEntity} from './PostEntity';
import {UserAddressEntity} from './UserAddressEntity';
import {UserCompanyEntity} from './UserCompanyEntity';

export interface UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddressEntity;
    phone: string;
    website: string;
    company: UserCompanyEntity;
}
