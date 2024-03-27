-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "isBegin" BOOLEAN NOT NULL DEFAULT false,
    "startAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("chatId", "description", "gameTitle", "id", "isBegin", "maxPlayers", "rounds", "startAt") SELECT "chatId", "description", "gameTitle", "id", "isBegin", "maxPlayers", "rounds", "startAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
