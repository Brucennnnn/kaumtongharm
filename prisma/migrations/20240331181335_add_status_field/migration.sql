-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "kuamTongHarm" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'alive',
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
