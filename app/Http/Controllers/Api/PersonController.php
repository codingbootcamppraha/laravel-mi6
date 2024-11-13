<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Person;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');

        $people_query = Person::with('aliases', 'image', 'status');

        if ($status) {
            $people_query = $people_query->where('status_id', $status);
        }

        $people = $people_query->get();

        return $people;
    }

    public function show($person_id)
    {
        $person = Person::with('aliases', 'image', 'status')
            ->findOrFail($person_id);

        return $person;
    }
}
