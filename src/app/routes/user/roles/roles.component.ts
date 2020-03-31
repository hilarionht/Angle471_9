import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
// import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Role , Page } from '@app/_models';
import { RoleService, ToasterService } from '@app/_services';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RolesComponent implements OnInit {
  page = new Page();
  rows = new Array<Role>();
  temp = [];
  loadingIndicator = true;
  reorderable = true;
  title = '';
  roles: Role[] = [];
  display = 'none';
  role: Role;
  id: any;
  data: any;
  closeResult: string;
  loading: boolean =  true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    public rolService: RoleService,
    public router: Router,
    private modalService: NgbModal,
    public toasterService: ToasterService
  ) {   this.page.limit = 10; }
  ngOnInit() {
    this.setPage({ offset: 0 });
    this.role  = new Role(null, 0);
  }

  setPage(pageInfo) {
    this.page.numberPage = pageInfo.offset + 1;
    this.rolService.findAll(this.page).subscribe((resp: any) => {
      this.rows = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
    });
  }
  search(event) {
    const val = event.target.value;
    console.log(val, 'data event', this.page );
    this.rolService.search(this.page, val).subscribe(( resp: any ) => {
      console.log(resp);
      this.rows = resp.data.entities;
      this.page = resp.data;
      this.page.numberPage = resp.data.numberPage - 1;
      setTimeout(() => { this.loading = false; }, 1500);
    });

  }
  add() {
    const date = new Date();
    this.display = 'block';
    this.role = new Role(null, 0, date.toString());
  }
  edit(role: Role) {
    this.role = role;
  }
 
  save(form?: NgForm) {
    form.value.name = form.value.name.toUpperCase();
    if (form.value.id != 0) {
      this.rolService.update(form.value.id, form.value)
      .subscribe((res: any) => {
        this.setPage({ offset: 0 });
        this.resetForm(form);
        this.modalService.dismissAll(this.CloseModal);
        this.toasterService.showSuccess('Notificacion', 'Datos modificados correctamente!!');
      });
    } else {
      this.rolService.save(form.value)
        .subscribe((res: any) => {
          this.setPage({ offset: 0 });
          this.resetForm(form);
          this.modalService.dismissAll(this.CloseModal);
          this.toasterService.showSuccess('Notificacion', 'Datos almacenados correctamente!!');
        });
    }
  }
  CloseModal(data: string, form?: NgForm) {
    this.modalService.dismissAll(this.CloseModal);
  }
  confirm(pdelete, id: any) {
    this.title = 'ELIMINAR';
    this.role = new Role(null, 0, null, null);
    if (id) {
      this.rolService.findOne(id).subscribe((resp: any) => {
        this.role = resp.data;
        this.modalService.open(pdelete, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then(
          () => {   }, () => {    });
       });
    }
  }
  delete(pdelete, id: number) {
    this.rolService.delete(id).subscribe((resp: any) => {
        this.setPage({ offset: 0 });
        this.modalService.dismissAll(pdelete);
    });

  }
  getRoles() {
    this.rolService.list().subscribe((resp: any) => {
      this.roles = resp.data as Role[];
      this.data = resp.data;
    });
  }
  close() {
    this.display = 'none';
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  open(content, id: number) {
    this.title = 'AGREGAR';
    this.role = new Role(null, 0, null, null);
    if (id) {
      this.rolService.findOne(id).subscribe((resp: any) => {
        this.role = resp;
        // tslint:disable-next-line:max-line-length
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      });
    } else {
      // tslint:disable-next-line:max-line-length
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  editbyid(content, id: number) {
    this.title = 'EDITAR';
    this.role = new Role(null, 0, null, null);
    if (id) {
      this.rolService.findOne(id).subscribe((resp: any) => {this.role = resp.data;
      // tslint:disable-next-line:max-line-length
                                                            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.
 then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); });
  }
  }

  private getDismissReason(reason: any, form?: NgForm): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
