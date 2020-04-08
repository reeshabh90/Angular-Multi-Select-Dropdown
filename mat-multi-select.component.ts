import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-multi-select',
  templateUrl: './mat-multi-select.component.html',
  styleUrls: ['./mat-multi-select.component.less']
})
export class MatMultiSelectComponent implements OnInit {

  @Input() selectedValue;
  @Input() options;
  @Input() placeholder: string;
  @Input() formControl: FormControl = new FormControl();

  labelCount = 2;
  displayString = '';
  constructor() { }

  ngOnInit() {
  }

  toggleAllSelection(allSelected) {
    if (allSelected.checked) {
      this.formControl
        .patchValue([...this.options.map(item => item.displayValue)]);
    } else {
      this.formControl.patchValue([]);
    }
  }

  tosslePerOne(allSelected) {
    if (allSelected.checked) {
      allSelected.checked = false;
      return false;
    }
    if (this.formControl.value.length === this.options.length) {
      allSelected.checked = true;
    }
  }

  onDisplayString() {
    this.displayString = '';
    if (this.formControl.value &&
      this.formControl.value.length) {
      const displayOption = [];

      // Multi select display
      for (let i = 0; i < this.labelCount; i++) {
        displayOption[i] = this.options.filter(
          option => option.displayValue === this.formControl.value[i]
        )[0];
      }
      if (displayOption.length) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < displayOption.length; i++) {
          if (displayOption[i] && displayOption[i].displayValue) {
            this.displayString += displayOption[i].displayValue + ',';
          }
        }
        this.displayString = this.displayString.slice(0, -1);
        if (
          this.formControl.value.length > 1 &&
          this.formControl.value.length > this.labelCount
        ) {
          this.displayString += ` (+${this.formControl.value.length -
            this.labelCount} others)`;
        }
      }

    }
    return this.displayString;
  }

}
