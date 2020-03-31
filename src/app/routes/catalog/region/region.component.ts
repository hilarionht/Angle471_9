
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from '@app/_models';
import { Region } from './region.model';
import { RegionService } from './region.service';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegionComponent implements OnInit {
  page = new Page();
  rows = new Array<Region>();
  rowsFilter = [];
  temp = [];
  formRegion: FormGroup;
  region: Region;
  regions: Region[] = [];
  title = 'CREAR';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    public regionService: RegionService,
    public router: Router,
    public modalService: NgbModal
  ) {
    this.formRegion = new FormGroup({
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
    for (const c in this.formRegion.controls) {
      this.formRegion.controls[c].markAsTouched();
      console.log(c, 'controls');
    }
    if (this.formRegion.valid) {
      if (this.formRegion.value.id === '0') {
        this.regionService.save(this.formRegion.value).subscribe(resp => {
          this.setPage({offset: 0 });
          this.formRegion.reset();
          this.modalService.dismissAll();
        });
      } else {
        this.regionService.update(this.formRegion.value.id, this.formRegion.value).subscribe(resp => {
          this.setPage({offset: 0 });
          this.formRegion.reset();
          this.modalService.dismissAll();
        });
      }
    }
  }

  open(content, id: number) {
    this.formRegion = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl('')
    });
    if (id) {
      this.regionService
        .findOne(id)
        .subscribe((resp: any) => {
          this.region = resp.data;
          // tslint:disable-next-line:max-line-length
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
                }, (reason) => {
              });
        });
    }
  }
  editbyid(content, id: number) {
    this.title = 'EDITAR';
    this.region = new Region('', 0);
    if (id) {
      this.regionService.findOne(id).subscribe((resp: any) => {
        this.region = resp.data;
        this.formRegion.patchValue(resp.data);
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
    this.region = new Region('', 0);
    if (id) {
      this.regionService.findOne(id).subscribe((resp: any) => {
        this.region = resp.data;
        this.modalService
            .open(pdelete, {
              ariaLabelledBy: 'modal-basic-title',
              backdropClass: 'light-blue-backdrop'
            })
            .result.then(() => {}, () => {});
            });
      this.setPage({ offset: 0 });
    }
  }
  delete(pdelete, id: number) {
    this.regionService.delete(id).subscribe((resp: any) => {
      this.setPage({ offset: 0 });
      this.modalService.dismissAll(pdelete);
    });
  }
  setPage(pageInfo) {
    this.page.numberPage = pageInfo.offset + 1;
    this.regionService.findAll(this.page).subscribe((resp: any) => {
      this.rows = resp.data.entities;
      this.temp = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
    });
  }
}
