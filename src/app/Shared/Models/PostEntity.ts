import {CommentEntity} from './CommentEntity';
import {UserEntity} from './UserEntity';

export interface PostEntity {
    id: number;
    userId: number;
    title: string;
    body: string;
    comments?: CommentEntity[];
}
