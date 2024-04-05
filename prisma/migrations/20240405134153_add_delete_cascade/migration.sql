-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameRoomId" INTEGER NOT NULL,
    CONSTRAINT "Chat_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("gameRoomId", "id") SELECT "gameRoomId", "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE UNIQUE INDEX "Chat_gameRoomId_key" ON "Chat"("gameRoomId");
CREATE TABLE "new_UserResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "kuamTongHarm" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'alive',
    "chatId" INTEGER NOT NULL,
    "gameRoomId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "UserResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserResult_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserResult_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserResult" ("chatId", "gameRoomId", "id", "kuamTongHarm", "point", "roundId", "status", "userId") SELECT "chatId", "gameRoomId", "id", "kuamTongHarm", "point", "roundId", "status", "userId" FROM "UserResult";
DROP TABLE "UserResult";
ALTER TABLE "new_UserResult" RENAME TO "UserResult";
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameRoomId" INTEGER NOT NULL,
    CONSTRAINT "Round_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("gameRoomId", "id", "startedAt") SELECT "gameRoomId", "id", "startedAt" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE TABLE "new_UserVote" (
    "voterId" TEXT NOT NULL,
    "voteToId" TEXT NOT NULL,
    "roundId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("voterId", "voteToId", "roundId", "chatId"),
    CONSTRAINT "UserVote_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserVote_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserVote" ("chatId", "createdAt", "roundId", "voteToId", "voterId") SELECT "chatId", "createdAt", "roundId", "voteToId", "voterId" FROM "UserVote";
DROP TABLE "UserVote";
ALTER TABLE "new_UserVote" RENAME TO "UserVote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
