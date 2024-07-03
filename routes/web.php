<?php

use Illuminate\Support\Facades\Route;


Route::view('/{path?}', 'main')->where('path', '.*');
// Route::get('/', function () {
//     return view('main');
// });

// Route::get('/people-of-interest', function () {
//     return view('main');
// });
