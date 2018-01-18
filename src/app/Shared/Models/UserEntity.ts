import {UserAddressEntity} from './UserAddressEntity';
import {UserCompanyEntity} from './UserCompanyEntity';

export interface UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    remember: boolean;
    address: UserAddressEntity;
    phone: string;
    website: string;
    company: UserCompanyEntity;
}
