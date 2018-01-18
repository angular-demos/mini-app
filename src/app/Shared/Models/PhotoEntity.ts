import {AlbumEntity} from './AlbumEntity';

export interface PhotoEntity {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
