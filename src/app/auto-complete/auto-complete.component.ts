import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'auto-complete-component',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['auto-complete.component.css']
})

export class AutoCompleteComponent implements OnInit {
    // @ViewChild('country') input: ElementRef<HTMLInputElement>;
    public countries: string[] = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    show = false;
    stateForm: FormGroup;
    @Input() search = '';
    @Output() searchChange = new EventEmitter<string>();

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    public ngOnInit() {
        this.stateForm.valueChanges.subscribe((changes) => {
            this.search = changes.search;
            this.searchChange.emit(this.search);
        })
    }

    // public ngOnChanges(changes: SimpleChanges) {
    //     const MyFormChanges: SimpleChange = changes.stateForm;
    //     // To Check current values
    //     // console.log(MyFormChanges.currentValue)
    //
    //     // To Check previous values
    //     // console.log(MyFormChanges.previousValue)
    //
    //     // To Set Current Values to fields using controls
    //     this.search = MyFormChanges.currentValue.search;
    //     // this.stateForm.controls['search'].setValue(MyFormChanges.currentValue.search);
    // }

    public toggleDropdown(){
        // debugger;
        this.show = !this.show;
    }

    getSearchValue() {
        // return this.input.nativeElement.value;
        return this.stateForm.value.search;
    }

    private initForm(): FormGroup {
        return this.stateForm = this.fb.group({
            search: [null]
        });
    }

    setValue(value) {
        this.stateForm.patchValue({'search': value});
        this.toggleDropdown();
    }
}
