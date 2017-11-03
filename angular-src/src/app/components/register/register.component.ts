import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, 
              private flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const User = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(User)) {
      this.flashMessagesService.show("Please fill in all fields!", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //Email validation (format only)
    if(!this.validateService.validateEmail(User.email)) {
      this.flashMessagesService.show("Please enter a valid email!", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Regsiter User
    this.authService.registerUser(User).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show("Registration successful!", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show("Registration failed!", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  }

}
