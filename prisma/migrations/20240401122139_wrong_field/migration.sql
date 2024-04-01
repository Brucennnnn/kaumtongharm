-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" TEXT NOT NULL,
    "voteToId" TEXT NOT NULL,
    "roundId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserVote_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserVote_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserVote" ("chatId", "createdAt", "id", "roundId", "voteToId", "voterId") SELECT "chatId", "createdAt", "id", "roundId", "voteToId", "voterId" FROM "UserVote";
DROP TABLE "UserVote";
ALTER TABLE "new_UserVote" RENAME TO "UserVote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
