import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'posts-posts',
    templateUrl: './Posts.html',
    styleUrls: ['./Posts.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
}
