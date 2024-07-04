<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mission;
use App\Models\Person;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMissionDetails;
use Illuminate\Support\Facades\Notification;
use App\Notifications\MissionOutcomeUpdated;
use App\Models\User;

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
            $old_mission_outcome = $mission->outcome;
        } else {
            $mission = new Mission;
        }

        $mission->name = $request->input('name');
        $mission->year = $request->input('year');
        $mission->outcome = $request->input('outcome');
        $mission->save();

        // if outcome has changed
        if ($mission_id && ($old_mission_outcome != $mission->outcome)) {
            // $user->notify(new Notification($mission))
            $admins = User::where('role', 'admin')->get();
            Notification::send($admins, new MissionOutcomeUpdated($mission));
        }

        return [
            'status' => 'success',
            'message' => 'The mission has been updated'
        ];
    }

    public function assignPerson(Request $request)
    {
        $mission_id = $request->input('mission_id');
        $person_id = $request->input('person_id');

        $request->validate([
            'mission_id' => Rule::unique('mission_person')->where(function ($query) use($mission_id,$person_id) {
                return $query->where('mission_id', $mission_id)
                    ->where('person_id', $person_id);
            }),
        ], [
            'mission_id.unique' => "The person has been already assigned to the mission"
        ]);

        $mission = Mission::find($mission_id);

        if (!$mission) {
            return [
                'status' => 'fail',
                'message' => 'Mission with the id ' . $mission_id . ' does not exist'
            ];
        }

        $person = Person::find($person_id);

        if (!$person) {
            return [
                'status' => 'fail',
                'message' => 'Person with the id ' . $person_id . ' does not exist'
            ];
        }

        $mission->people()->attach($person->id);

        return [
            'status' => 'success',
            'message' => 'Person attached to the mission successfully'
        ];
    }

    public function unassignPerson(Request $request)
    {
        $mission_id = $request->input('mission_id');
        $person_id = $request->input('person_id');

        $mission = Mission::find($mission_id);

        if (!$mission) {
            return [
                'status' => 'fail',
                'message' => 'Mission with the id ' . $mission_id . ' does not exist'
            ];
        }

        $person = Person::find($person_id);

        if (!$person) {
            return [
                'status' => 'fail',
                'message' => 'Person with the id ' . $person_id . ' does not exist'
            ];
        }

        $mission->people()->detach($person->id);

        return [
            'status' => 'success',
            'message' => 'Person detached from the mission successfully'
        ];
    }

    public function sendMissionDetails(Request $request)
    {
        $mission_id = $request->input('mission_id');
        $user = auth()->user();

        $mission = Mission::find($mission_id);

        if (!$mission) {
            return [
                'status' => 'fail',
                'message' => 'Mission with the id ' . $mission_id . ' does not exist'
            ];
        }

        Mail::to($user->email)
            ->send(new SendMissionDetails($mission));

        return [
            'status' => 'success',
            'message' => 'Email was sent successfully'
        ];
    }
}
