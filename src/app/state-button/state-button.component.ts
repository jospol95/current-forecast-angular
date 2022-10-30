import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Loadable} from '../state/loadable';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'state-button-component',
    templateUrl: './state-button.component.html'
})

export class StateButtonComponent implements OnChanges {
    @Input() loadable: Loadable;
    @Output() mainClickEvent = new EventEmitter();
    public active: boolean;
    public waiting: boolean;
    public loaded: boolean;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes.loadable.currentValue);
        //TODO refactor to only 2 props
        if(!changes.loadable.currentValue.loading && !changes.loadable.currentValue.success){
            this.active = true;
            this.waiting = false;
            this.loaded = false;
        }
        if(changes.loadable.currentValue.loading){
            this.active = false;
            this.waiting = true;
            this.loaded = false;
        }
        if(changes.loadable.currentValue.success){
            this.active = false;
            this.waiting = false;
            this.loaded = true;
            setTimeout(() => {
                this.active = true;
                this.waiting = false;
                this.loaded = false;
            }, 500);

        }
    }
}
