<?php

use Illuminate\Support\Facades\Route;
use Modules\LMS\App\Http\Controllers\LMSController;
use Modules\LMS\App\Http\Controllers\RoomController;
use Modules\LMS\App\Http\Controllers\SchoolClassController;

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

Route::middleware(['auth'])->prefix('lms/classes')->name('lms.classes.')->group(function () {
    Route::get('/', [SchoolClassController::class, 'index'])->name('index');
    Route::get('/create', [SchoolClassController::class, 'create'])->name('create');
    Route::post('/', [SchoolClassController::class, 'store'])->name('store');
    Route::get('/{class}/edit', [SchoolClassController::class, 'edit'])->name('edit');
    Route::put('/{class}', [SchoolClassController::class, 'update'])->name('update');
    Route::delete('/{class}', [SchoolClassController::class, 'destroy'])->name('destroy');
});


Route::middleware(['auth'])
    ->prefix('lms/rooms')
    ->name('lms.rooms.')
    ->group(function () {
        Route::get('/', [RoomController::class, 'index'])->name('index');
        Route::get('/create', [RoomController::class, 'create'])->name('create');
        Route::post('/', [RoomController::class, 'store'])->name('store');
        Route::get('/{room}', [RoomController::class, 'show'])->name('show');
        Route::get('/{room}/edit', [RoomController::class, 'edit'])->name('edit');
        Route::put('/{room}', [RoomController::class, 'update'])->name('update');
        Route::delete('/{room}', [RoomController::class, 'destroy'])->name('destroy');
    });