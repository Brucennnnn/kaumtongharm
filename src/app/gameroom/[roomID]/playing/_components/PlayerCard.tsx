"use client";
import { cn } from "@ktm/lib/utils";
import { Button } from "@ktm/components/ui/button";
import { useState } from "react";
import { api } from "@ktm/trpc/react";
import { socket } from "@ktm/action/socket";
export default function PlayerCard({
	isAlive,
	name,
	chatId,
	roundId,
	userId,
	point,
	fromUser,
	word,
}: {
	isAlive: boolean;
	userId: string;
	chatId: number;
	roundId: number;
	name: string;
	point: number;
	fromUser: string;
	word: string;
}) {
	const [isHovered, setIsHovered] = useState(false);
	const vote = api.gameAction.voteToUser.useMutation();

	const utils = api.useUtils();
	async function handleOnVote() {
		vote.mutate({
			chatId: chatId,
			roundId: roundId,
			toUser: userId,
		});
		socket.emit("announcement-message", {
			channel: `announcement-channel-${chatId}`,
			type: "vote",
			message: `${name} voted by ${fromUser}`,
		});
		await utils.gameRoom.getRecentRound.invalidate();
	}

	return (
		<Button
			className={cn(
				"flex h-fit w-full min-w-[200px] justify-between",
				isAlive
					? "hover:shodow-none bg-roombg shadow-button  hover:bg-error hover:shadow-none"
					: "cursor-not-allowed bg-roombg opacity-50",
			)}
			disabled={!isAlive}
			onClick={handleOnVote}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isAlive && isHovered ? (
				<div className="flex w-full items-center justify-center">
					<div className="h4 font-bold text-background">Vote</div>
				</div>
			) : (
				<>
					<div className="flex flex-row gap-2">
						<div className="h4 font-bold text-stroke">{name}</div>
						<div className="h4 font-bold text-error">({point})</div>
					</div>
					<div className="h4 font-bold text-stroke">{word}</div>
				</>
			)}
		</Button>
	);
}
