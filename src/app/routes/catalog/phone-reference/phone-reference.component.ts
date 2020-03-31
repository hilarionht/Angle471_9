import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from '@app/_models';
import { PhoneReference, PhoneReferenceService } from '.';
@Component({
  selector: 'app-phone-reference',
  templateUrl: './phone-reference.component.html',
  styleUrls: ['./phone-reference.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneReferenceComponent implements OnInit {
  page = new Page();
  rows = new Array<PhoneReference>();
  rowsFilter = [];
  temp = [];
  formPhoneReference: FormGroup;
  phoneReference: PhoneReference;
  phoneReferences: PhoneReference[] = [];
  title = 'CREAR';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    public phoneRefService: PhoneReferenceService,
    public router: Router,
    public modalService: NgbModal
  ) {
    this.formPhoneReference = new FormGroup({
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
  save(form?: NgForm) {
    if (form.value.id !== '0') {
      form.value.name = form.value.name.toUpperCase();
      this.phoneRefService.update(form.value.id, form.value).subscribe(res => {
        this.setPage({offset: 0 });
        this.modalService.dismissAll();
      });
    } else {
      form.value.name = form.value.name.toUpperCase();
      this.phoneRefService.save(form.value).subscribe(res => {
        this.setPage({offset: 0 });
        this.modalService.dismissAll();
      });
    }
  }
  open(content, id: number) {
    this.phoneReference =  new PhoneReference('', 0);
    if (id) {
      this.phoneRefService
        .findOne(id)
        .subscribe((resp: any) => {this.phoneReference = resp.data;
          // tslint:disable-next-line:max-line-length
                                   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
          }, (reason) => {
        });
        });
    } else {
      // tslint:disable-next-line:max-line-length
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      }, (reason) => {
    });
    }
  }
  editbyid(content, id: number) {
    this.phoneReference = new PhoneReference('', 0);
    if (id) {
      this.phoneRefService.findOne(id).subscribe((resp: any) => {
        this.phoneReference = resp.data;
        this.formPhoneReference.patchValue(resp.data);
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
    this.phoneReference = new PhoneReference('', 0);
    if (id) {
      this.phoneRefService.findOne(id).subscribe((resp: any) => {
        this.phoneReference = resp.data;
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
    this.phoneRefService.delete(id).subscribe((resp: any) => {
      this.setPage({ offset: 0 });
      this.modalService.dismissAll(pdelete);
    });
  }
  setPage(pageInfo) {
    this.page.numberPage = pageInfo.offset + 1;
    this.phoneRefService.findAll(this.page).subscribe((resp: any) => {
      this.rows = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
    });
  }
}
