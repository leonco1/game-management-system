/*
  Warnings:

  - Added the required column `email` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Developer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "Developer_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Developer" ("id", "name", "postedById", "surname") SELECT "id", "name", "postedById", "surname" FROM "Developer";
DROP TABLE "Developer";
ALTER TABLE "new_Developer" RENAME TO "Developer";
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
