<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

// Or:
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth');

Route::get('/people', [App\Http\Controllers\Api\PersonController::class, 'index']);
Route::get('/people/{person_id}', [App\Http\Controllers\Api\PersonController::class, 'show']);
Route::get('/statuses', [App\Http\Controllers\Api\StatusController::class, 'index']);

Route::get('/missions', [App\Http\Controllers\Api\MissionController::class, 'index'])->middleware('auth');
Route::get('/missions/{mission_id}', [App\Http\Controllers\Api\MissionController::class, 'show']);
Route::post('/missions/store/{mission_id}', [App\Http\Controllers\Api\MissionController::class, 'store']);
Route::post('/missions/assign-person', [App\Http\Controllers\Api\MissionController::class, 'assignPerson']);
Route::post('/missions/unassign-person', [App\Http\Controllers\Api\MissionController::class, 'unassignPerson']);
Route::post('/missions/send-details', [App\Http\Controllers\Api\MissionController::class, 'sendMissionDetails']);