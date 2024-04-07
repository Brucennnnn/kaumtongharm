import { cn } from '@ktm/lib/utils';

export default function NameCard({
  isMe,
  name,
  isAlive,
  point,
  word,
}: {
  isMe: boolean;
  name: string;
  isAlive: boolean;
  point?: number;
  word?: string;
}) {
  let bg = 'bg-roombg';
  if (isMe) {
    if (isAlive) {
      bg = 'bg-light';
    } else {
      bg = 'bg-medie';
    }
  }

  let displaypoint = point?.toString();
  if (displaypoint) {
    displaypoint = '(' + point + ')';
  }
  return (
    <div className={cn('flex h-fit w-full min-w-[200px] justify-start rounded-md px-4 py-2 shadow-button', bg)}>
      <div className="flex flex-row gap-2">
        <div className={cn('h4 font-bold ', isAlive ? 'text-stroke' : 'text-white')}>{name}</div>
        <div className="h4 flex flex-row gap-2 font-bold text-error">{displaypoint}</div>
        <div className="h4 flex flex-row gap-2 font-bold text-secondary-click w-fit">{word}</div>
      </div>
    </div>
  );
}
