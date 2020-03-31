import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ProvinceService, Province } from '.';
import { Page } from '@app/_models';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvinceComponent implements OnInit {
  page = new Page();
  rows = new Array<Province>();
  rowsFilter = [];
  temp = [];
  provincs: Province[] = [];
  display = 'none';
  province: Province;
  id: any;
  closeResult: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    public provService: ProvinceService,
    public modalService: NgbModal,
    public router: Router
  ) {
    this.page.limit = 10;
  }
  title = 'CREAR';
  ngOnInit() {
    this.setPage({ offset: 0 });
    this.province  = new Province(null, 0);
  }
  setPage(pageInfo) {
    this.page.numberPage = pageInfo.offset + 1;
    this.provService.findAll(this.page).subscribe((resp: any) => {
      this.rows = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
    });
  }
  add() {
    const date = new Date();
    this.display = 'block';
    this.province = new Province(null, 0);

  }
  edit(province: Province) {
    this.province = province;
  }
  save(content, form?: NgForm) {


    if (form.value.id !== '0') {
      form.value.name = form.value.name.toUpperCase();
      this.provService.update(form.value.id, form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.setPage({offset: 0});
      });
    } else {
      form.value.name = form.value.name.toUpperCase();
      this.provService.save(form.value)
        .subscribe(resp => {
          this.resetForm(form);
          this.setPage({offset: 0});
        });
    }
    this.modalService.dismissAll(content);
  }
  CloseModal(data: string, form?: NgForm) {
    // console.log(form.value);

    // this.modalService.dismissAll(this.CloseModal);
  }
  getProvinces() {
    this.provService.list().subscribe((resp: any) => {
      this.provincs = resp.data as Province[];
    });
  }
  close() {
    this.display = 'none';
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      // this.getUsers();
    }
  }
  confirm(pdelete, id: any) {
    this.province = new Province(null, 0, null, null);
    if (id) {
      this.provService.findOne(id).subscribe((resp: any) => this.province = resp.data);
    }
    this.modalService.open(pdelete, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then(() => {
    }, () => {
    });
  }
  search(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  delete(pdelete, id: number) {
    this.title = 'ELIMINAR';
    this.provService.delete(id).subscribe((resp: any) => {
      this.setPage({offset: 0});
    });
    this.modalService.dismissAll(pdelete);
  }
  department(id: string) {
   this.router.navigate(['catalog/department', id]);
  }
  editbyid(content, id: number) {
    this.title = 'EDITAR';
    this.province = new Province(null, 0, null, null);
    if (id) {
      this.provService.findOne(id).subscribe((resp: any) => this.province = resp.data);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }
  open(content, id: number) {
    this.province = new Province(null, 0);
    if (id) {
      this.provService.findOne(id).subscribe((resp: any) => this.province = resp.data);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // private getDismissReason(reason: any,form?: NgForm): string {
  //   // console.log('form:  ', form);
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }


  // }
}
