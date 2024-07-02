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
}
