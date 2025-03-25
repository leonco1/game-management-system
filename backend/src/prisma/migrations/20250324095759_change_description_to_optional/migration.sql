-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageURL" TEXT,
    "description" TEXT
);
INSERT INTO "new_Game" ("description", "id", "imageURL", "title") SELECT "description", "id", "imageURL", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
