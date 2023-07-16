<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAuthUser(Request $request): JsonResponse
    {
        return $this->successResponse(
            new UserResource($request->user())
        );
    }
}
