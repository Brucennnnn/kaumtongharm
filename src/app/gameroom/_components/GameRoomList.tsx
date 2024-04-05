'use client';

import { type gameRoom } from '../interfaces';
import GameRoomBox from './GameRoomBox';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@ktm/components/ui/button';
import { Input } from '@ktm/components/ui/input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '@ktm/trpc/react';
import { Form } from '@ktm/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface gameRoomListProps {
  selectedroom: gameRoom | null;
  setSelectedRoom: Dispatch<SetStateAction<gameRoom | null>>;
}

const formSchema = z.object({
  searchQuery: z.string(),
});

const defaultValues = {
  searchQuery: '',
};

export default function GameRoomList(props: gameRoomListProps) {
  const { setSelectedRoom, selectedroom } = props;

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [searchString, setSearchString] = useState('');
  const allRooms = () => {
    const { data } = api.gameRoom.getGameRoomsByFilter.useQuery({
      searchQuery: searchString,
    });
    if (!data) return <></>;
    return data.map((item) => {
      return (
        <GameRoomBox
          key={item.id}
          room={
            {
              id: item.id,
              roomName: item.roomName,
              maxPlayers: item.maxPlayers,
              rounds: item.rounds,
              description: item.description,
              chatId: item.chat?.id,
              roundTime: item.roundTime,
              isBegin: item.isBegin,
              createdAt: item.createdAt,
              currentPlayers: item.chat?.User.length,
            } as gameRoom
          }
          selectedroom={selectedroom}
          setSelectedRoom={setSelectedRoom}
        />
      );
    });
  };

  const { handleSubmit, setValue } = methods;
  const formSubmit = (searchQuery: { searchQuery: string }) => {
    setSearchString(searchQuery.searchQuery);
    console.log(searchQuery.searchQuery);
  };
  return (
    <div className="flex  w-full grow flex-col gap-3">
      <div className="flex w-full justify-end">
        <Button
          className="text-md rounded-md border-2 border-stroke yellow font-bold shadow-button"
          onClick={() => {
            setSelectedRoom(null);
          }}
        >
          Create Game
        </Button>
      </div>
      <Form {...methods}>
        <form onSubmit={handleSubmit(formSubmit)} className="flex w-full flex-col gap-4">
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-2.5  self-center text-2xl text-stroke"
              width="16"
              type="submit"
            />
            <Input
              placeholder="Search Room"
              className="text-md h-fit w-full rounded-md border-none bg-background py-2  pl-10 text-lg font-semibold text-stroke focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValue('searchQuery', e.target.value);
              }}
            />
          </div>
        </form>
      </Form>
      <div className="scroll flex w-full grow flex-col gap-y-3 rounded-lg bg-background p-3 max-h-[150px] lg:max-h-full">
        {allRooms()}
      </div>
    </div>
  );
}
