import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderProcessComponent } from './components/order-process/order-process.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RequestProcessComponent } from './components/request-process/request-process.component';
import { PurchaseProcessComponent } from './components/purchase-process/purchase-process.component';
import { PurchaseRequestProcessComponent } from './components/purchase-request-process/purchase-request-process.component';
import { ListPurchasesComponent } from './components/list-purchases/list-purchases.component';
import { ListRequestsComponent } from './components/list-requests/list-requests.component';
import { ListIngredientsComponent } from './components/list-ingredients/list-ingredients.component';
import { DetailRecipeComponent } from './components/detail-recipe/detail-recipe.component';



const appRoutes = [
	{ path: '', component: LoginComponent },
	{ path: 'inicio', component: HomeComponent },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: 'order-new', component: OrderNewComponent },
	{ path: 'order-list/:status', component: OrderListComponent },
	{ path: 'order-process/:id', component: OrderProcessComponent },
	{ path: 'recipe-list', component: RecipeListComponent },
	{ path: 'detail-recipe/:id', component: DetailRecipeComponent },
	{ path: 'request-process/:status', component: RequestProcessComponent },
	{ path: 'purchase-process', component: PurchaseProcessComponent },
	{ path: 'purchaseRequest-process/:status', component: PurchaseRequestProcessComponent },
	{ path: 'list-purchases', component: ListPurchasesComponent },
	{ path: 'list-requests/:status', component: ListRequestsComponent },
	{ path: 'list-ingredients', component: ListIngredientsComponent },
	];


	// EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);