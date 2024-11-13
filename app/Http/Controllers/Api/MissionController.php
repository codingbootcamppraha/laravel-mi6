<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mission;

class MissionController extends Controller
{
    public function index() 
    {
        $missions = Mission::with('people')
            ->get();   
        
        return $missions;
    }

    public function show($mission_id)
    {
        $mission = Mission::with('people')
            ->findOrFail($mission_id);
        
        return $mission;
    }

    public function store(Request $request, $mission_id = null)
    {
        // ... validation
        $request->validate([
            'name' => 'required',
            'year' => 'required'
        ]);

        if ($mission_id) {
            $mission = Mission::findOrFail($mission_id);
        } else {
            $mission = new Mission();
        }

        $mission->name = $request->input('name');
        $mission->year = $request->input('year');
        $mission->outcome = $request->input('outcome');
        $mission->save();

        return [
            'status' => 'success',
            'message' => 'The mission has been updated'
        ];
    }
}
