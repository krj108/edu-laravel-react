<?php

namespace Modules\User\App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{

    public function show(User $user)
    {
    return Inertia::render('User::User/Show', [
        'user' => $user,
    ]);
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
    
        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString(); 
    
        return Inertia::render('User::User/Index', [
            'users' => $users,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('User::User/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'avatar'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
{
    return Inertia::render('User::User/Edit', [
        'user' => $user,
    ]);
}

public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,'.$user->id,
        'password' => 'nullable|min:6|confirmed',
        'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->has('password')) {
        $validated['password'] = Hash::make($validated['password']);
    }

    if ($request->hasFile('avatar')) {
        $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
    }

    $user->update($validated);

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
}
public function destroy(User $user)
{
    $user->delete();
    return redirect()->route('users.index')->with('success', 'User deleted successfully.');
}

}
