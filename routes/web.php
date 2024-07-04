<?php

use Illuminate\Support\Facades\Route;

Route::view('/login', 'main')->name('login');
Route::view('/{path?}', 'main')->where('path', '^((?!admin).)*$');
// Route::get('/', function () {
//     return view('main');
// });

// Route::get('/people-of-interest', function () {
//     return view('main');
// });
