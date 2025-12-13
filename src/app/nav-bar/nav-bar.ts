import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar implements OnInit, OnDestroy {
  private destroy = new Subject();
  isAuthenticated:boolean=false;
  constructor(public authService:AuthService) {
    authService.authStatus.pipe(takeUntil(this.destroy)).subscribe(result=>{
      this.isAuthenticated=result;
    });   
   }
  ngOnInit(): void {
    this.isAuthenticated=this.authService.isAuthenticated(); 
  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
