import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User, Role } from '@app/_models';
import { UserService, RoleService, AuthenticationService } from '@app/_services';
import { CustomValidators } from 'ngx-custom-validators';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  rols: Role[] = [];
  constructor(
  public userService: UserService,
  public authService: AuthenticationService,
  public roleService: RoleService,
  public router: Router,
  public modalService: NgbModal,
  fb: FormBuilder
              ) {
                const userData = jwt_decode(this.authService.currentUserValue.token);
                this.user = userData.user;
                console.log('data profile', this.authService.currentUserValue);
                this.roleService.list().subscribe( (resp: any) => {
                  this.rols = resp.data;
                });
                this.userService.findOne(this.user.id).subscribe( (resp: any) => {
                  // console.log(resp);
                  this.user = resp.data;
                  this.profileForm.patchValue(this.user);
                });
                //console.log(this.user);
                this.profileForm = fb.group({
                  id: [null, Validators.required],
                  username: [null, Validators.required],
                  roleId: [null, Validators.required],
                  email: [null, CustomValidators.email]
              });
  }

  ngOnInit() {
    const userData = jwt_decode(this.authService.currentUserValue.token);
    this.user = userData.user;
    console.log('data profile ngOnInit...', this.user);
  }
  save(form: any) {
  console.log(form);
  }
  removed(data: any) {

  }
  seleccionImage(data:any){
  }
}
