-- CreateTable
CREATE TABLE "AccountHistory" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "newAmount" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountHistory_pkey" PRIMARY KEY ("id")
);
