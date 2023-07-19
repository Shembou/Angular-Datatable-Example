import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from 'src/app/model/options';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent implements OnInit {

  @Output() filters: FormGroup;
  @Output() sentFilters = new EventEmitter<FormGroup>();
  statuses: Options[];

  constructor() {}

  ngOnInit() {
    this.createFormGroup();
    this.emitFilters();
    this.setOptions();
    this.attachFilterListener();
  }

  createFormGroup() {
    const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};

    this.filters = new FormGroup({
      status: new FormControl(storedFilters.status) || new FormControl(),
      search: new FormControl(storedFilters.search) || new FormControl(),
      availability: new FormControl(storedFilters.availability) || new FormControl()
    });
  }

  setOptions() {
    this.statuses = [
      {value: 0, name: 'Delivered'},
      {value: 1, name: 'Traveling'},
      {value: 2, name: 'Pending'},
      {value: 3, name: 'Cancelled'},
      {value: 4, name: 'On Hold'},
      {value: 5, name: 'Returned'}
    ]
  }

  attachFilterListener() {
    this.filters.valueChanges.subscribe(() => {
      this.updateSessionStorage();
      this.emitFilters();
    })
  }

  updateSessionStorage() {
    sessionStorage.setItem('filters', JSON.stringify(this.filters.value));
  }

  emitFilters() {
    this.sentFilters.emit(this.filters);
  }
}
