/*
The MIT License (MIT)

Copyright (c) 2017 Quentin Oschatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction, 
 including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
*/

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
