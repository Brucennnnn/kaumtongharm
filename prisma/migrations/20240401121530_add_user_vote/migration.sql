-- CreateTable
CREATE TABLE "UserVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER NOT NULL,
    "voteToId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserVote_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserVote_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "UserResult_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserResult" ("chatId", "gameRoomId", "id", "kuamTongHarm", "point", "roundId", "status", "userId") SELECT "chatId", "gameRoomId", "id", "kuamTongHarm", "point", "roundId", "status", "userId" FROM "UserResult";
DROP TABLE "UserResult";
ALTER TABLE "new_UserResult" RENAME TO "UserResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
