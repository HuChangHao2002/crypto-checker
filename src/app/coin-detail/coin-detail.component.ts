import { Component , OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss'
})
export class CoinDetailComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number = 1;
  currency : string = 'MYR';
  constructor(
    private api : ApiService,
    private activateRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
      this.activateRoute.params.subscribe(val=>{
        this.coinId = val['id'];
      })
      this.getCoinData();
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData)
    })
  }
}
