import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, ValidatorFn, FormControl, Validators } from '@angular/forms';
import { User, Role } from '@app/_models';
import { UserService, RoleService  } from '@app/_services';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  rol: Role;
  id: any;
  roles: Role[] = [];
  accion = 'Alta';
  userForm: FormGroup;
  blackList = ['bad@email.com', 'some@mail.com', 'wrong@email.co'];
  constructor(
    public userService: UserService,
    public rolService: RoleService,
    public routeActivate: ActivatedRoute,
    public router: Router,
    fb: FormBuilder,
    public toastService: ToastrService
  ) {
    // tslint:disable-next-line:prefer-const
    let password = new FormControl('', Validators.required);
        // tslint:disable-next-line:prefer-const
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));
        // Model Driven validation
        // tslint:disable-next-line:align
        this.userForm = fb.group({
            sometext: [null, Validators.required],
            checkbox: [null, Validators.required],
            radio: ['', Validators.required],
            select: [null, Validators.required],
            digits: [null, Validators.pattern('^[0-9]+$')],
            minlen: [null, Validators.minLength(6)],
            maxlen: [null, Validators.maxLength(10)],
            email: [null, CustomValidators.email],
            url: [null, CustomValidators.url],
            date: [null, CustomValidators.date],
            number: [null, Validators.compose([Validators.required, CustomValidators.number])],
            alphanum: [null, Validators.pattern('^[a-zA-Z0-9]+$')],
            minvalue: [null, CustomValidators.min(6)],
            maxvalue: [null, CustomValidators.max(10)],
            minwords: [null, this.minWords(6)],
            maxwords: [null, this.maxWords(10)],
            minmaxlen: [null, CustomValidators.rangeLength([6, 10])],
            range: [null, CustomValidators.range([10, 20])],
            rangewords: [null, Validators.compose([this.minWords(6), this.maxWords(10)])],
            email_bl: [null, this.checkBlackList(this.blackList) ],
            passwordGroup: fb.group({
                password: password,
                confirmPassword: certainPassword
            })
        });

    this.routeActivate.params.subscribe( param => {
      this.id = param['id'];
      this.user = new User(this.id);
      if(this.id != '0'){
        this.userService.findOne(this.id).subscribe((user:any) => {
          this.user = user.data[0];
          this.rol = user.data[0].role;
          // this.user.role_id = this.rol.id;
          //this.user.role = this.rol.id;
          this.accion= 'Edicion';
        } );
      }
      this.loadRoles();
    });
  }
submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line:forin
        for (let c in this.userForm.controls) {
            this.userForm.controls[c].markAsTouched();
        }
        if (this.userForm.valid) {
            // console.log('Valid!');
        }
        // console.log(value);
    }

    minWords(checkValue): ValidatorFn {
        return ((control: FormControl) => {
            return (control.value || '').split(' ').length >= checkValue ? null : { 'minWords': control.value };
        }) as ValidatorFn;
    }

    maxWords(checkValue): ValidatorFn {
        return ((control: FormControl) => {
            return (control.value || '').split(' ').length <= checkValue ? null : { 'maxWords': control.value };
        }) as ValidatorFn;
    }

    checkBlackList(list: Array<string>): ValidatorFn {
        return ((control: FormControl) => {
            return list.indexOf(control.value) < 0 ? null : { 'blacklist': control.value };
        }) as ValidatorFn;
    }
  ngOnInit() {
  }
  addUser(form?: NgForm){
    // console.log('clicked'+ this.id, 'FormValue: '+ form.value.id);
    // console.log(form.value);
    if(form.value.id === 0) {
      this.userService.save(form.value)
        .subscribe(res => {
          this.toastService.success('Guardado con Exito!','El registro fue almacenado de forma correcta' , {timeOut: 2000});
          this.resetForm(form);
          this.router.navigate(['config/users']);
        });
    } else {
      this.userService.update(form.value.id, form.value)
      .subscribe(res => {
        this.toastService.success('Modificado con Exito!','El registro fue modificado de forma correcta');
        this.resetForm(form);
        this.router.navigate(['config/users']);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }
  loadRoles(){
    this.rolService.list().subscribe((resp: any) => {
        this.roles = resp.data;
    });
  }
}
