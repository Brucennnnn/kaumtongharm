/*
  Warnings:

  - Added the required column `description` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTitle` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rounds` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "isBegin" BOOLEAN NOT NULL,
    "startAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("chatId", "id", "isBegin", "startAt") SELECT "chatId", "id", "isBegin", "startAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
