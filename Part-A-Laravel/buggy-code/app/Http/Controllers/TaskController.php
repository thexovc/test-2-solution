<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index()
    {
        // Fetch tasks for current user
        $tasks = Task::all()->where('user_id', auth()->user()->id);
        return response()->json($tasks);
    }
}

