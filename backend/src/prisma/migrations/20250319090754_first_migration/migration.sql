/*
  Warnings:

  - You are about to drop the column `postedById` on the `Developer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Developer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Developer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Developer" ("email", "id", "name", "surname") SELECT "email", "id", "name", "surname" FROM "Developer";
DROP TABLE "Developer";
ALTER TABLE "new_Developer" RENAME TO "Developer";
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
