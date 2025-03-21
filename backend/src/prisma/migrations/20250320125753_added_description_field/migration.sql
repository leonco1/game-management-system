/*
  Warnings:

  - Added the required column `description` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageURL" TEXT,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Game" ("id", "imageURL", "title") SELECT "id", "imageURL", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
