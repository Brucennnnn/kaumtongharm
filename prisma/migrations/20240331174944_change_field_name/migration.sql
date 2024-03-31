/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Game";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomName" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "roundTime" INTEGER NOT NULL DEFAULT 240,
    "isBegin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Chat_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("gameId", "id") SELECT "gameId", "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE UNIQUE INDEX "Chat_gameId_key" ON "Chat"("gameId");
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("gameId", "id", "startedAt") SELECT "gameId", "id", "startedAt" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE TABLE "new_UserResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "kuamTongHarm" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "UserResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserResult" ("chatId", "gameId", "id", "kuamTongHarm", "point", "roundId", "userId") SELECT "chatId", "gameId", "id", "kuamTongHarm", "point", "roundId", "userId" FROM "UserResult";
DROP TABLE "UserResult";
ALTER TABLE "new_UserResult" RENAME TO "UserResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
