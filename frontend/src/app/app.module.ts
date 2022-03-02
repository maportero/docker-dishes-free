import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderProcessComponent } from './components/order-process/order-process.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RequestProcessComponent } from './components/request-process/request-process.component';
import { PurchaseProcessComponent } from './components/purchase-process/purchase-process.component';
import { ListPurchasesComponent } from './components/list-purchases/list-purchases.component';
import { ListRequestsComponent } from './components/list-requests/list-requests.component';
import { ListIngredientsComponent } from './components/list-ingredients/list-ingredients.component';
import { PurchaseRequestProcessComponent } from './components/purchase-request-process/purchase-request-process.component';

import { OrderService } from './services/order.service';
import { RequestStoreService } from './services/requestStore.service';
import { PurchaseService } from './services/purchase.service';
import { PurchaseRequestService } from './services/purchaseRequest.service';
import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
import { DetailRecipeComponent } from './components/detail-recipe/detail-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrderNewComponent,
    OrderListComponent,
    OrderProcessComponent,
    RecipeListComponent,
    RequestProcessComponent,
    PurchaseProcessComponent,
    ListPurchasesComponent,
    ListRequestsComponent,
    ListIngredientsComponent,
    PurchaseRequestProcessComponent,
    DetailRecipeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
  appRoutingProviders,
  OrderService,
  RequestStoreService,
  PurchaseRequestService,
  PurchaseService,
  IngredientService,
  RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
