import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['symbol', 'flag', 'name', 'continents', 'population', 'area', 'button'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  isLoading: boolean = false;
  error: string | null = null;
  filterVal: string = '';
  searchText: string = '';

  constructor(
    public data: DataService,
    public route: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onFetchData();
  }

  ngAfterViewInit(): void {
    // Ensures paginator is properly assigned
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        this.cdr.detectChanges();
      } else {
        console.warn('⚠️ Paginator not found or assigned incorrectly.');
      }
    });
  }

  onFetchData(): void {
    this.isLoading = true;
    this.data.getAllCountries().subscribe(
      (res) => {
        if (res && Array.isArray(res)) {
          this.dataSource.data = res;
          this.assignPaginator();
        } else {
          this.error = 'Error: Invalid data format received from the API.';
        }
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Error 404! Try again after some time.';
        this.isLoading = false;
      }
    );
  }

  onClickCountry(element: any): void {
    this.data.dataSource = element;
    this.route.navigate(['country', element.flag]);
  }

  onPress(): void {
    this.data.getSearchByName(this.searchText).subscribe(
      (res) => {
        if (res && Array.isArray(res)) {
          this.dataSource.data = res;
          this.assignPaginator();
        } else {
          console.warn('⚠️ Invalid data format received during search.');
          this.onFetchData();
        }
      },
      (err) => {
        console.error('❌ Error during search:', err);
        this.onFetchData();
      }
    );
  }

  onChange(event: any): void {
    const val = event.target.value;
    if (val === 'Filter Based on Continent') {
      this.onFetchData();
    } else {
      this.data.filterByRegion(val).subscribe(
        (res) => {
          if (res && Array.isArray(res)) {
            this.dataSource.data = res;
            this.assignPaginator();
          } else {
            console.warn('⚠️ Invalid data format received during filter.');
          }
        },
        (err) => console.error('❌ Error:', err)
      );
    }
  }

  private assignPaginator(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource._updateChangeSubscription();
      this.cdr.detectChanges();
    } else {
      console.warn('⚠️ Paginator not found during assignment.');
    }
  }
}
