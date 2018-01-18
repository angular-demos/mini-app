import {UserAddressGeoEntity} from './UserAddressGeoEntity';

export interface UserAddressEntity {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UserAddressGeoEntity;
}
