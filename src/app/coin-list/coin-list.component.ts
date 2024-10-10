import { Component , OnInit , AfterViewInit , ViewChild} from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule
  ],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
  schemas: [
    NO_ERRORS_SCHEMA 
  ],
})
export class CoinListComponent implements OnInit{
  

  bannerData : any=[];
  currency: string = "MYR";
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService , private router: Router ,
    private currencyService: CurrencyService
  ){ }

  ngOnInit(): void {
      this.getAllData();
      this.getBannerData();
      this.currencyService.getCurrency()
      .subscribe( val=> {
        this.currency = val;
        this.getAllData();
        this.getBannerData;
      } )
  }

  getBannerData(){
    this.api.getTrendingCurrency(this.currency)
    .subscribe(res=>{
      console.log(res);
      this.bannerData = res;
    })
  }

  getAllData(){
    this.api.getCurrency(this.currency)
    .subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row:any) {
    this.router.navigate(['coin-detail',row.id])
  }
}
