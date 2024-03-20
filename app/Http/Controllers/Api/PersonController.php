<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;
use App\Notifications\TestNotification;
use App\Models\User;
use Illuminate\Support\Facades\Notification;


class PersonController extends Controller
{
    public function index(Request $request)
    {
        $page = max(1, intval($request->input('page') ?? 1));

        $search = $request->input('search');
        $status = $request->input('status');

        $on_page = 20;

        // start building the query
        $builder = Person::query()
            ->with([
                'image',
                'status',
                'aliases'
            ]);

        if ($search) {
            $builder->where('name', 'like', "%{$search}%");
        }
        if ($status) {
            $builder->where('status_id', $status);
        }

        // make a separate query to calculate the total
        $total = $builder->count();
        $last_page = max(1, ceil($total / $on_page));

        $people = $builder->limit($on_page)
            ->offset(($page - 1) * $on_page)
            ->get();

        return compact('people', 'total', 'last_page');
    }

    public function show(Request $request) {
        $person_id = $request->person_id;

        $person = Person::with('image')
            ->with('aliases')
            ->findOrFail($person_id);

        $total = 1;
        $last_page = 1;

        return compact('person', 'total', 'last_page');
    }

    public function sendTestEmail() {
        $temp_var = 'This is variable test';

        Mail::to('test@test.com')
            ->send(new TestEmail($temp_var));
    }

    public function sendTestNotification() {
        $users = User::get();

        Notification::send($users, new TestNotification('hi'));

        // $user = User::first();
        // $user->notify(new TestNotification('hi'));
    }
}
