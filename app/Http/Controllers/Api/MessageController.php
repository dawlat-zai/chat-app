<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $messages = Message::with('user')->get();

        return $this->successResponse(
            MessageResource::collection($messages)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required'
        ]);

        $message = $request->user()->messages()->create($request->all());
        $message->user;

        broadcast(new MessageSent(new MessageResource($message)));

        return $this->successResponse(
            new MessageResource($message), true
        );
    }
}
