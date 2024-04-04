'use client';
import { logout } from '@ktm/action/auth';
export default function LogoutButton() {
  return (
    <form
      action={logout}
      className="absolute bottom-0 right-0 m-3 rounded-md  border border-stroke bg-error px-4 py-2 text-lg font-bold text-stroke shadow-button"
    >
      <button>Sign out</button>
    </form>
  );
}
