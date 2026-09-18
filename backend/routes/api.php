<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PricesController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working'
    ]);
});

Route::middleware('api.token')->get(
    '/prices',
    [PricesController::class, 'index']
);

//Route::get('/prices', [PricesController::class, 'index']);
