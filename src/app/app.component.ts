import { Component, ViewChild } from '@angular/core';
import { CustomerService } from './customerservice';
import { Customer } from './customer';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('table') table: Table;
  datasource: Customer[];

  customers: Customer[];

  totalRecords: number;

  cols: any[];

  loading: boolean;

  constructor(
    private customerService: CustomerService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    //datasource imitation
    this.customerService.getCustomersLarge().then((data) => {
      this.datasource = data;
      this.totalRecords = data.length;
    });

    this.loading = true;
    this.primengConfig.ripple = true;
  }

  resetTable() {
    console.log('Reseting table...');
    this.table.reset();
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    console.log('loading customers!');

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.customers = this.datasource.slice(
          event.first,
          event.first + event.rows
        );
        this.loading = false;
      }
    }, 1000);
  }
}
