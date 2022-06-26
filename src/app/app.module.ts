import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DeleteBtnComponent } from './delete-btn/delete-btn.component';
import { HighlightersDirective } from './directives/highlighters.directive';
import { AnimationDemoComponent } from './animation-demo/animation-demo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    ResgisterComponent,
    TransactionComponent,
    DeleteBtnComponent,
    HighlightersDirective,
    AnimationDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
