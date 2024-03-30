import { Button } from "@ktm/components/ui/button";
import { Input } from "@ktm/components/ui/input";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoomCard from "./RoomCard";
export default function LeftSideRoomList() {
  const [searchString, setSearchString] = useState("");
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex w-full justify-end">
        <Button className="text-md rounded-md border border-stroke bg-pending font-bold">
          Create Game
        </Button>
      </div>
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-3 self-center text-stroke"
          size="lg"
        />
        <Input
          placeholder="Search Room"
          className="text-md h-fit w-full rounded-md border-none bg-background py-2  pl-10 text-lg font-semibold text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div className=" w-full flex-1  flex-col rounded-md bg-background p-2">
        <RoomCard />
      </div>
    </div>
  );
}
