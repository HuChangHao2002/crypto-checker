import { Component , OnInit} from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
  schemas: [
    NO_ERRORS_SCHEMA 
  ],
})
export class CoinListComponent implements OnInit{
  constructor(private api : ApiService){ }

  bannerData : any=[];

  ngOnInit(): void {
      this.getAllData();
      this.getBannerData();
  }

  getBannerData(){
    this.api.getTrendingCurrency("MYR")
    .subscribe(res=>{
      console.log(res);
      this.bannerData = res;
    })
  }

  getAllData(){
    this.api.getCurrency("MYR")
    .subscribe(res=>{
      console.log(res);
    })
  }
}
