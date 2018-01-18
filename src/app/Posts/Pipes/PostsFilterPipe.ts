import {Pipe, PipeTransform} from '@angular/core';
import {PostEntity} from '../../Shared/Models/PostEntity';

@Pipe({
    name: 'postsFilter',
    pure: false
})
export class PostsFilterPipe implements PipeTransform {
    /**
     * A simple post filter function.
     */
    public transform(posts: PostEntity[], value: string): PostEntity[] {
        if (!posts || !value) {
            return posts;
        }
        return posts.filter(post => post.title.indexOf(value) !== -1 || post.body.indexOf(value) !== -1);
    }
}
