-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "startAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("gameId", "id") SELECT "gameId", "id" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "roundTime" INTEGER NOT NULL DEFAULT 240,
    "isBegin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("chatId", "createdAt", "description", "gameTitle", "id", "isBegin", "maxPlayers", "rounds") SELECT "chatId", "createdAt", "description", "gameTitle", "id", "isBegin", "maxPlayers", "rounds" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
