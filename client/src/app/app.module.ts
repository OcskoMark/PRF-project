import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { GameComponent } from './pages/game/game.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyToolbarsComponent } from './toolbars/my-toolbars/my-toolbars.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    GameComponent,
    UsersComponent,
    NotFoundComponent,
    MyToolbarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MyToolbarsComponent]
})
export class AppModule { 

}
