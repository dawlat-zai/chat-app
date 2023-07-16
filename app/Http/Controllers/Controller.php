<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Success response
     *
     * @param  JsonResource  $data
     * @param  bool  $resourceCreated
     * @return JsonResponse
     */
    protected function successResponse(JsonResource $data, bool $resourceCreated = false): JsonResponse
    {
        return response()
            ->json(
                $data,
                $resourceCreated ?
                    Response::HTTP_CREATED :
                    Response::HTTP_OK
            );
    }

    /**
     * Error response
     *
     * @param  string  $errorMessage
     * @param  int  $responseCode
     * @return JsonResponse
     */
    protected function errorResponse(string $errorMessage, int $responseCode): JsonResponse
    {
        return response()
            ->json(
                ['message' => $errorMessage],
                $responseCode
            );
    }

    /**
     * Delete response
     *
     * @return JsonResponse
     */
    protected function deleteResponse(): JsonResponse
    {
        return response()
            ->json(
                null,
                Response::HTTP_NO_CONTENT
            );
    }
}
