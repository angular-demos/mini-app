import {PhotoEntity} from './PhotoEntity';

export interface AlbumEntity {
    id: number;
    userId: number;
    title: string;
    photos?: PhotoEntity[];
}
