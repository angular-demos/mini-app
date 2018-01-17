import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './Main.html',
  styleUrls: ['./Main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
}
