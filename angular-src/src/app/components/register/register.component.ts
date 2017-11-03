import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
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

  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { }

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

  }

}
