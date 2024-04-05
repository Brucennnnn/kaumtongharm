/*
  Warnings:

  - A unique constraint covering the columns `[word]` on the table `KaumTongHarm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KaumTongHarm_word_key" ON "KaumTongHarm"("word");
