import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page, User, Role } from '@app/_models';
import { UserService , RoleService } from '@app/_services';
import { ToasterService } from '@app/_services';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  page = new Page();
  rows = new Array<User>();
  temp = [];
  users: User[] = [];
  user: User;
  rol: Role;
  id: 0;
  roles: Role[] = [];
  accion = 'Alta';
  userForm: FormGroup;
  totalRegistros = 0;
  cargando = true;
  dtTrigger: Subject<any> = new Subject();
  datosTabla: User[];
  title = '';
  public loading: false;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    public userService: UserService,
    public roleService: RoleService,
    private modalService: NgbModal,
    public router: Router,
    public toastService: ToasterService
    ) {
      this.user = new User(this.id);
      this.page.limit = 10;
    }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.loadRoles();
  }
  editUser(content, id: any) {
    if (id) {
        this.userService.findOne(id).subscribe((user: any) => {
          this.user = user.data;
          this.title = 'EDICION';
          this.loadRoles();
          // tslint:disable-next-line:max-line-length
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
        }, (reason) => {
        });
          } );
        }
}
confirm(pdelete, id: any) {
  if (id) {
    this.userService.findOne(id).subscribe((user: any) => {
      this.user = user.data[0];
      this.rol = user.data[0].role;
      // this.user.role = this.rol.id;
      this.title = 'ELIMINAR';
      this.loadRoles();
      // tslint:disable-next-line:max-line-length
      this.modalService.open(pdelete, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
        }, (reason) => {
        });
      });
    }
}
delete(pdelete, id: number) {
  this.userService.delete(id).subscribe((resp: any) => {
    if (resp) {
      this.setPage({offset: 0});
    }
  });
  this.modalService.dismissAll(pdelete);
}
loadUsers() {
  this.userService.list().subscribe((resp: any) => {
    this.users = resp.data;
  });
}
loadRoles() {
  this.roleService.getAll().subscribe((resp: any) => {
      this.roles = resp.data;
  });
}
onSort(event) {
  // event was triggered, start sort sequence
  const sort = event.sorts[0];
  this.page.prop = sort.prop;
  this.page.dir = sort.dir;
  this.page.numberPage = this.page.numberPage + 1;
  console.log('Sort Event', this.page);
  this.userService.findAll(this.page).subscribe((resp: any) => {
    this.rows = resp.data.entities;
    this.page = resp.data;
    this.page.numberPage = resp.data.numberPage - 1;
  });
}
setPage(pageInfo) {
  this.page.numberPage = pageInfo.offset + 1;
  this.userService.findAll(this.page).subscribe((resp: any) => {
    this.rows = resp.data.entities;
    this.page = resp.data;
    this.page.numberPage = resp.data.numberPage - 1;
  });
}
search(event) {
  const val = event.target.value.toLowerCase();
  const temp = this.temp.filter(function(d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });
  this.rows = temp;
  this.table.offset = 0;
}
resetForm(form?: NgForm) {
  if (form) {
    form.reset();
    // this.getUsers();
  }
}
addUser(content, form?: NgForm) {
  console.log(form.value.id);
  
  if (form.value.id === 0 ) {
    this.userService.save(form.value)
      .subscribe(res => {
        this.toastService.showToast('Usuario', 'Usuario creado con exito', 'success');
        this.resetForm(form);
        this.setPage({ offset: 0 });
        this.modalService.dismissAll(content);
      });
  } else {
    this.userService.update(form.value.id, form.value)
      .subscribe(res => {
        //this.toastService.showToast('Usuario', 'El usuario fue modificado de forma correcta!', 'success');
        this.toastService.showHTMLMessage('<h5>El usuario fue modificado de forma correcta!!!</h5>', 'Notification');
        this.resetForm(form);
        this.setPage({ offset: 0 });
        this.modalService.dismissAll(content);
      });
  }
}
open(content, id: string) {
  this.title = 'AGREGAR';
  this.user = new User( 0 );
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  backdropClass: 'light-blue-backdrop'}).result.then((result) => {
  }, (reason) => {
  });
}
removed(data:any){
  
}
}
