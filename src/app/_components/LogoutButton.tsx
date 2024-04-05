'use client';
import { logout } from '@ktm/action/auth';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@ktm/components/ui/button';
interface LogoutButtonProps {
  handleExit: () => Promise<void>;
}
export default function LogoutButton(props: LogoutButtonProps) {
  async function handle() {
    await props.handleExit();
    await logout();
  }
  return (
    <form action={handle}>
      <Button className=" rounded-full border border-stroke bg-red-default hover:bg-red-hover focus:bg-red-click p-3 text-lg font-bold  shadow-button m-0">
        <FontAwesomeIcon icon={faRightToBracket} className="  self-center text-2xl text-stroke" width="16" />
      </Button>
    </form>
  );
}
