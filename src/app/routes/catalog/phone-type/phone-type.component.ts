
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PhoneTypeService } from './phone-type.service';
import { PhoneType } from './phone-type.model';
import { Page } from '@app/_models';
@Component({
  selector: 'app-phone-type',
  templateUrl: './phone-type.component.html',
  styleUrls: ['./phone-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneTypeComponent implements OnInit {
  page = new Page();
  rows = new Array<PhoneType>();
  rowsFilter = [];
  temp = [];
  formPhoneType: FormGroup;
  phonetype: PhoneType;
  phonetypes: PhoneType[] = [];
  title = 'CREAR';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    public phoneTypeService: PhoneTypeService,
    public router: Router,
    public modalService: NgbModal
  ) {
    this.formPhoneType = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl('')
    });
    this.page.limit = 10;
  }
  ngOnInit() {
    this.setPage({ offset: 0 });
  }
  save($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line:forin
    for (const c in this.formPhoneType.controls) {
      this.formPhoneType.controls[c].markAsTouched();
    }
    if (this.formPhoneType.valid) {
      if (this.formPhoneType.value.id === '0') {
        this.phoneTypeService.save(this.formPhoneType.value).subscribe(resp => {
          this.setPage({offset: 0 });
          this.formPhoneType.reset();
          this.modalService.dismissAll();
        });
      } else {
        this.phoneTypeService.update(this.formPhoneType.value.id, this.formPhoneType.value).subscribe(resp => {
          this.setPage({offset: 0 });
          this.formPhoneType.reset();
          this.modalService.dismissAll();
        });
      }
    }
  }

  open(content, id: number) {
    this.formPhoneType = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl('')
    });
    if (id) {
      this.phoneTypeService
        .findOne(id)
        .subscribe((resp: any) => (this.phonetype = resp.data));
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      }, (reason) => {
    });
  }
  editbyid(content, id: number) {
    this.title = 'EDITAR';
    this.phonetype = new PhoneType('', 0);
    if (id) {
      this.phoneTypeService.findOne(id).subscribe((resp: any) => {
        this.phonetype = resp.data;
        this.formPhoneType.patchValue(resp.data);
        this.modalService
            .open(content, {
              ariaLabelledBy: 'modal-basic-title',
              backdropClass: 'light-blue-backdrop'
            })
            .result.then(result => {}, reason => {});
            });
    }
  }
  confirm(pdelete, id: any) {
    this.title = 'ELIMINAR';
    this.phonetype = new PhoneType('', 0);
    if (id) {
      this.phoneTypeService.findOne(id).subscribe((resp: any) => {
        this.phonetype = resp.data;
        this.modalService
            .open(pdelete, {
              ariaLabelledBy: 'modal-basic-title',
              backdropClass: 'light-blue-backdrop'
            })
            .result.then(() => {}, () => {});
      });
    }
  }
  delete(pdelete, id: number) {
    this.phoneTypeService.delete(id).subscribe((resp: any) => {
      this.setPage({ offset: 0 });
    });
    this.modalService.dismissAll(pdelete);
  }
  setPage(pageInfo) {
    this.page.numberPage = pageInfo.offset + 1;
    console.log(this.page);
    this.phoneTypeService.findAll(this.page).subscribe((resp: any) => {
      this.rows = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
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
}
