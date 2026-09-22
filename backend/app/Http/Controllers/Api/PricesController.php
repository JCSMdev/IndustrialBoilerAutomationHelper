<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PricesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = Http::get(
            'https://api.energy-charts.info/v2/price',
            [
                'bzn' => 'HU',
            ]
        );

        if ($response->failed()) {
            return response()->json([
                'message' => 'Failed to fetch energy prices.'
            ], 502);
        }
        $formated = $response->json();

        $prices = array_map(fn($item) => [
                'timestamp' => $item['timestamp'],
                'price'     => $item['values']['day_ahead_price'],
            ],
            $formated['data']);
        return response()->json($prices);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
