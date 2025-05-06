<?php

namespace Modules\LMS\App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\LMS\App\Models\Room;
use Modules\LMS\App\Models\SchoolClass;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $rooms = Room::with('schoolClass')
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('LMS::Rooms/Index', [
            'rooms' => $rooms,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        $classes = SchoolClass::pluck('name', 'id');
        return Inertia::render('LMS::Rooms/Create', compact('classes'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'content'          => 'nullable|string',
            'school_class_id'  => 'required|exists:school_classes,id',
            'image'            => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('rooms', 'public');
        }

        Room::create($data);

        return redirect()->route('lms.rooms.index')
                         ->with('success', 'Room created successfully.');
    }

    public function edit(Room $room)
    {
        $classes = SchoolClass::pluck('name', 'id');
        return Inertia::render('LMS::Rooms/Edit', compact('room', 'classes'));
    }

    public function update(Request $request, Room $room)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'content'          => 'nullable|string',
            'school_class_id'  => 'required|exists:school_classes,id',
            'image'            => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($room->image);
            $data['image'] = $request->file('image')->store('rooms', 'public');
        }

        $room->update($data);

        return redirect()->route('lms.rooms.index')
                         ->with('success', 'Room updated successfully.');
    }

    public function show(Room $room)
    {
        $room->load('schoolClass');
        return Inertia::render('LMS::Rooms/Show', compact('room'));
    }

    public function destroy(Room $room)
    {
        Storage::disk('public')->delete($room->image);
        $room->delete();

        return redirect()->route('lms.rooms.index')
                         ->with('success', 'Room deleted successfully.');
    }
}
