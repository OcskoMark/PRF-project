import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { GamesComponent } from './pages/admin/games/games.component';
import { GameComponent } from './pages/game/game.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/games', component: GamesComponent, canActivate: [AdminGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
