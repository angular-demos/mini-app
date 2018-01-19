import {Directive, Input} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MainComponent} from './Main';

@Directive({
    selector: 'users-info'
})
class MockUserInfoComponent {

}

@Directive({
    selector: 'ui-toast'
})
class MockToastComponent {
    @Input()
    public stack: boolean;
}

describe('MainComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                MockUserInfoComponent,
                MockToastComponent,
                MainComponent
            ]
        }).compileComponents();
    }));
    it('should render MiniApp in navbar', async(() => {
        const fixture = TestBed.createComponent(MainComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.navbar-brand').textContent).toContain('MiniApp');
    }));
});
