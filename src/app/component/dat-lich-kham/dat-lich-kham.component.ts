import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BenhNhanService } from 'src/app/service/benhnhan.service';


@Component({
  selector: 'app-dat-lich-kham',
  templateUrl: './dat-lich-kham.component.html',
  styleUrls: ['./dat-lich-kham.component.scss']
})
export class DatLichKhamComponent implements OnInit {

  validateForm!: FormGroup;


  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, private notification: NzNotificationService, private service: BenhNhanService) { }

  tenBN: string = '';
  ngaySinh: string = '';
  Email: string = '';
  diaChi: string = '';
  SDT: string = '';
  ngayDatHen: string = '';
  noiDungKham: string = '';

  errmsg: string = '';
  succsess: string = '';

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tenBN: [null, [Validators.required]],
      ngaySinh: [null, [Validators.required]],
      diaChi: [null, [Validators.required]],
      SDT: [null, [Validators.required]],
      Email: [null, [Validators.required]],
      ngayDatHen: [null, [Validators.required]],
      noiDungKham: [null, [Validators.required]],
      remember: [true]
    });
  }

  userForm = new FormGroup({
    tenBN: new FormControl('', Validators.required),
    ngaySinh: new FormControl('', Validators.required),
    diaChi: new FormControl('', Validators.required),
    SDT: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    ngayDatHen: new FormControl('', Validators.required),
    noiDungKham: new FormControl('', Validators.required),
  });
  
  hienThongBao(): void {
    
    this.notification
      .blank(
        'Thông báo',
        'Đặt lịch khám thành công.'
      )
      .onClick.subscribe(() => {
        this.addData();
        console.log('notification clicked!');
      });
  }
  addData() {
    if (this.userForm.valid) {
      this.service.dangKyBenhNhan(this.userForm.value).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        this.succsess = res.message;
      });
    } else {
      this.errmsg = 'Chưa nhập dữ liệu!';
    }
  }
}
