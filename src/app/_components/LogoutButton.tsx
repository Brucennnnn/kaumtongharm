import { logout } from "@ktm/action/auth";
export default async function LogoutButton() {
  return (
    <form
      action={logout}
      className="absolute bottom-0 right-0 rounded-md bg-error px-4 py-2 text-lg"
    >
      <button>Sign out</button>
    </form>
  );
}
