import {PostEntity} from './PostEntity';

export interface CommentEntity {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}
