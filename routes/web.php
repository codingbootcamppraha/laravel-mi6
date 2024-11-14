<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('index');
// });

Route::view('/login', 'index')->name('login');
Route::view('/{path?}', 'index')->where('path', '^((?!admin).)*$');
