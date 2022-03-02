<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Controlador de prueba

Route::get('/test', 'TestController@index');

// Controlador de las ordenes
Route::get('/api/orders/{status?}', 'OrderController@index');
Route::post('/api/order/store', 'OrderController@store');
Route::get('/api/order/detail/{id}', 'OrderController@detail');
Route::post('/api/order/process', 'OrderController@process');

//Controlador para los ingredientes
Route::get('api/ingredients', 'IngredientController@index');

//Controldador de compars en el mercado
Route::get('api/purchases', 'PurchaseController@index');

//Controlador para las recetas
Route::get('api/recipes', 'RecipeController@index');
Route::get('api/recipe/detail/{id}', 'RecipeController@detail');
Route::get('api/recipe/detailRecipe/{id}', 'RecipeController@detailRecipe');

//Controlador para las solicitudes de compras
Route::get('api/purchaseRequests/{status?}', 'PurchaseRequestController@index');
Route::post('api/purchaseRequest/process', 'PurchaseRequestController@process');

//Controlador para las solicitudes a la bodega
Route::get('api/requestStore/{status?}', 'RequestStoreController@index');
Route::post('api/requestStore/process', 'RequestStoreController@process');
