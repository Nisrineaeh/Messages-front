import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.userService.inscription(formData).subscribe({
        next: (newUtilisateur) => {
          console.log('Utilisateur enregistré avec succès :', newUtilisateur);
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription :', error);
        }
      });
    } else {
      console.error('Formulaire invalide. Veuillez corriger les erreurs.');
    }
  }
}