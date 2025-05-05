<?php

namespace Modules\LMS\App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\LMS\App\Models\SchoolClass;
use Illuminate\Support\Facades\Storage;

class SchoolClassController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $classes = SchoolClass::query()
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('LMS::Classes/Index', [
            'classes' => $classes,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('LMS::Classes/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'content' => 'nullable|string',
            'image'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('classes', 'public');
        }

        SchoolClass::create($data);

        return redirect()->route('lms.classes.index')->with('success', 'تم إنشاء الصف بنجاح.');
    }

    public function edit(SchoolClass $class)
    {
        return Inertia::render('LMS::Classes/Edit', [
            'class' => $class,
        ]);
    }

    public function update(Request $request, SchoolClass $class)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'content' => 'nullable|string',
            'image'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
           
            if ($class->image) {
                Storage::disk('public')->delete($class->image);
            }
            $data['image'] = $request->file('image')->store('classes', 'public');
        }

        $class->update($data);

        return redirect()->route('lms.classes.index')->with('success', 'تم تحديث بيانات الصف بنجاح.');
    }

    public function destroy(SchoolClass $class)
    {
        if ($class->image) {
            Storage::disk('public')->delete($class->image);
        }
        $class->delete();

        return redirect()->route('lms.classes.index')->with('success', 'تم حذف الصف بنجاح.');
    }
}
