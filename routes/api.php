<?php

use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\MissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//                                  /api/user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/people', [PersonController::class, 'index'])->name('api.people');
Route::get('/people/{person_id}', [PersonController::class, 'show']);
Route::get('/statuses', [StatusController::class, 'index']);
Route::get('/missions', [MissionController::class, 'index']);
Route::get('/missions/{mission_id}', [MissionController::class, 'show']);
Route::post('/missions/store', [MissionController::class, 'store'])->name('api.missions.store');
Route::post('/missions/assign-person', [MissionController::class, 'assignPerson']);
Route::post('/missions/unassign-person', [MissionController::class, 'unassignPerson']);
Route::get('/missions/get-details/{mission_id}', [MissionController::class, 'sendMissionDetails']);
