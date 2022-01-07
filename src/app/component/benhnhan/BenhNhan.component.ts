import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BenhNhanService } from 'src/app/service/benhnhan.service';
// import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-BenhNhan',
  templateUrl: './BenhNhan.component.html',
  styleUrls: ['./BenhNhan.component.css'],
  providers: [NzNotificationService],
})
export class BenhNhanComponent implements OnInit {
  constructor(private service: BenhNhanService, private modal: NzModalService, private router: ActivatedRoute, private notification: NzNotificationService
  ) { }

  readData: any;

  getParamId: any;

  errmsg: string = '';
  succsess: string = '';

  tenBN: string = '';
  ngaySinh: string = '';
  Email: string = '';
  diaChi: string = '';
  SDT: string = '';
  ngayDatHen: string = '';
  noiDungKham: string = '';

  ngOnInit(): void {

    this.getAllData();

    this.getParamId = this.router.snapshot.paramMap.get('maBN');

    if (this.getParamId) {
      this.service.getDataId(this.getParamId).subscribe((res) => {
        this.userForm.patchValue({
          // Đổ dữ liệu ngược lại theo id có key Object 0
          tenBN: res.data[0].tenBN,
          ngaySinh: res.data[0].ngaySinh,
          diaChi: res.data[0].diaChi,
          SDT: res.data[0].SDT,
          Email: res.data[0].Email,
          ngayDatHen: res.data[0].ngayDatHen,
          noiDungKham: res.data[0].noiDungKham
        });
      });
    }
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

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.addData();
    console.log('Button ok clicked!');
    this.notification
      .blank(
        'Thông báo',
        'Thêm khám thành công.'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!')

      });
    this.isVisible = false;
    this.reLoad();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  isVisible1 = false;

  showModal1(): void {
    this.isVisible1 = true;
    this.getParamId = this.router.snapshot.paramMap.get('maBN');

    this.service.getDataId(this.getParamId);

    if (this.getParamId) {
      this.service.getDataId(this.getParamId).subscribe((res) => {
        this.userForm.patchValue({
          // Đổ dữ liệu ngược lại theo id có key Object 0
          tenBN: res.data[0].tenBN,
          ngaySinh: res.data[0].ngaySinh,
          diaChi: res.data[0].diaChi,
          SDT: res.data[0].SDT,
          Email: res.data[0].Email,
          ngayDatHen: res.data[0].ngayDatHen,
          noiDungKham: res.data[0].noiDungKham
        });
      });
    }
  }

  handleOk1(): void {
    this.userUpdate();
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }

  isVisible2 = false;

  userUpdate() {
    if (this.userForm.valid) {
      this.service.updateBenhNhan(this.userForm.value, this.getParamId)
        .subscribe((res) => {
          console.log(res);
          this.succsess = res.message;
          this.getAllData();
        });
    } else {
      this.errmsg = 'Chưa cập nhật dữ liệu!';
    }
  }

  reLoad(): void {
    window.location.reload()
  }

  showModal2(): void {
    this.getParamId = this.router.snapshot.paramMap.get('maBN');

    this.service.getDataId(this.getParamId);

    if (this.getParamId) {
      this.service.getDataId(this.getParamId).subscribe((res) => {
        this.userForm.patchValue({
          // Đổ dữ liệu ngược lại theo id có key Object 0
          tenBN: res.data[0].tenBN,
          ngaySinh: res.data[0].ngaySinh,
          diaChi: res.data[0].diaChi,
          SDT: res.data[0].SDT,
          Email: res.data[0].Email,
          ngayDatHen: res.data[0].ngayDatHen,
          noiDungKham: res.data[0].noiDungKham
        });
      });
    }
    this.isVisible2 = true;
  }

  handleOk2(): void {
    console.log('Button ok clicked!');
    // this.userForm.value = this.FormControl.value;
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Bạn chắc chắn muốn xoá bệnh nhân này?',
      nzContent: '<b style="color: red;">Sau khi xoá dữ liệu từ bệnh nhân cũng sẽ bị xoá</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.service.deleteBenhNhan(this.getParamId).subscribe((res) => {
          console.log(res);
        });
        console.log('OK')
        this.reLoad();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  // Add data
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

  //Get all data
  getAllData() {
    this.service.getAllData().subscribe((res) => {
      this.readData = res.data;
    });
  }
  //Get delete id
  deleteID(id: any) {
    this.service.deleteBenhNhan(id).subscribe((res) => {
      console.log(res);
      this.getAllData();
    });
  }
}