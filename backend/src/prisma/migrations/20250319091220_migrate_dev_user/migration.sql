/*
  Warnings:

  - You are about to drop the column `email` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Developer` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Developer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Developer_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Developer" ("id", "name", "surname") SELECT "id", "name", "surname" FROM "Developer";
DROP TABLE "Developer";
ALTER TABLE "new_Developer" RENAME TO "Developer";
CREATE UNIQUE INDEX "Developer_userEmail_key" ON "Developer"("userEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
