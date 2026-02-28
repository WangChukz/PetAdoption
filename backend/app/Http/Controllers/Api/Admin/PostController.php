<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = \App\Models\Post::with('author');
        
        if ($request->filled('published')) {
            $query->where('published', collect([true, 'true', 1, '1'])->contains($request->published));
        }
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        
        return response()->json([
            'success' => true,
            'data' => $query->orderByDesc('created_at')->paginate($request->get('per_page', 20))
        ]);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'excerpt' => 'nullable|string|max:500',
            'published' => 'boolean',
        ]);

        $validated['author_id'] = $request->user()->id;
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . uniqid();
        
        if ($request->boolean('published')) {
            $validated['published_at'] = now();
        }

        $post = \App\Models\Post::create($validated);
        return response()->json(['success' => true, 'data' => $post->load('author')], 201);
    }

    public function show(\App\Models\Post $post): \Illuminate\Http\JsonResponse
    {
        return response()->json(['success' => true, 'data' => $post->load('author')]);
    }

    public function update(Request $request, \App\Models\Post $post): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image_url' => 'nullable|url',
            'excerpt' => 'nullable|string|max:500',
            'published' => 'boolean',
        ]);

        if (array_key_exists('title', $validated) && $validated['title'] !== $post->title) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . uniqid();
        }

        if (array_key_exists('published', $validated)) {
            if ($validated['published'] && !$post->published) {
                $validated['published_at'] = now();
            } else if (!$validated['published']) {
                $validated['published_at'] = null;
            }
        }

        $post->update($validated);
        return response()->json(['success' => true, 'data' => $post->fresh('author')]);
    }

    public function destroy(\App\Models\Post $post): \Illuminate\Http\JsonResponse
    {
        $post->delete();
        return response()->json(['success' => true]);
    }

    public function togglePublish(\App\Models\Post $post): \Illuminate\Http\JsonResponse
    {
        $post->update([
            'published' => !$post->published,
            'published_at' => !$post->published ? now() : null,
        ]);
        return response()->json(['success' => true, 'data' => $post->fresh('author')]);
    }
}
