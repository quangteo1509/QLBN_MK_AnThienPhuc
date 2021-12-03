import { Component, OnInit } from '@angular/core';
import { DataMauService } from 'src/app/service/data-mau.service';

@Component({
  selector: 'app-matkinh',
  templateUrl: './matkinh.component.html',
  styleUrls: ['./matkinh.component.scss']
})
export class MatkinhComponent implements OnInit {

  constructor(private sanPham: DataMauService) { }

  ngOnInit(): void {
  }
  data = this.sanPham.sanPham
}