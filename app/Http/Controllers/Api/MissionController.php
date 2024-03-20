<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMissionDetails;
use Illuminate\Support\Facades\Notification;
use App\Notifications\MissionOutcomeUpdated;

class MissionController extends Controller
{

    public function index() : string
    {
        return Mission::all()->toJson();
    }

    public function show(int $id) : string
    {
         return Mission::with([
            'people',
        ])->findOrFail($id)->toJson();
    }

    public function store(Request $request) {
        $mission = Mission::findOrFail($request->input('id'));

        $outcome_updated = $mission->outcome == $request->input('outcome') ? false : true;

        $mission->name = $request->input('name');
        $mission->year = $request->input('year');
        $mission->outcome = $request->input('outcome');

        $mission->save();

        if ($outcome_updated) {
            $admins = User::where('role', 'admin')->get();
    
            Notification::send($admins, new MissionOutcomeUpdated($mission));
        }
        
        return ['message' => 'Succesfully saved'];
    }

    public function assignPerson(Request $request)
    {
        $mission_id = $request->input('missionId');

        $mission = Mission::findOrFail($mission_id);

        $person_id = $request->input('personId');

        $person = Person::findOrFail($person_id);

        $mission->people()->attach($person->id);

        return 'success';
    }

    public function unassignPerson(Request $request)
    {
        $mission_id = $request->input('missionId');

        $mission = Mission::findOrFail($mission_id);

        $person_id = $request->input('personId');

        $person = Person::findOrFail($person_id);

        $mission->people()->detach($person->id);

        return 'success';
    }

    public function sendMissionDetails($mission_id) {
        $mission = Mission::findOrFail($mission_id);

        $user = Auth::user();

        Mail::to($user ? $user->email : 'test@test.com')
            ->send(new SendMissionDetails($mission));
        
        return [
            'success_message' => 'Details sent!'
        ];
    }
}
