import { Component } from '@angular/core';
import { UsersFormComponent } from '../users/users-form/users-form.component';

@Component({
  selector: 'app-register',
  imports: [UsersFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
}
