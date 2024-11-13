<?php

use Illuminate\Support\Facades\Route;

Route::get('/people', [App\Http\Controllers\Api\PersonController::class, 'index']);
Route::get('/people/{person_id}', [App\Http\Controllers\Api\PersonController::class, 'show']);
Route::get('/statuses', [App\Http\Controllers\Api\StatusController::class, 'index']);

Route::get('/missions', [App\Http\Controllers\Api\MissionController::class, 'index']);
Route::get('/missions/{mission_id}', [App\Http\Controllers\Api\MissionController::class, 'show']);
Route::post('/missions/store/{mission_id}', [App\Http\Controllers\Api\MissionController::class, 'store']);
