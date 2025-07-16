-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "avatarUrl" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemInfo" (
    "kernelVersion" TEXT NOT NULL,
    "osVersion" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemInfo_pkey" PRIMARY KEY ("hostId","timestamp")
);

-- CreateTable
CREATE TABLE "MemoryInfo" (
    "totalMemory" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availableMemory" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedMemory" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSwap" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availableSwap" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedSwap" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hostId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemoryInfo_pkey" PRIMARY KEY ("hostId","timestamp")
);

-- CreateTable
CREATE TABLE "DiskInfo" (
    "name" TEXT NOT NULL,
    "mountPoint" TEXT,
    "totalSpace" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availableSpace" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hostId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiskInfo_pkey" PRIMARY KEY ("hostId","timestamp","name")
);

-- CreateTable
CREATE TABLE "InterfaceInfo" (
    "name" TEXT NOT NULL,
    "dataReceived" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dataTransmitted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hostId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterfaceInfo_pkey" PRIMARY KEY ("hostId","timestamp","name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_provider_key" ON "Account"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Host_name_key" ON "Host"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemInfo" ADD CONSTRAINT "SystemInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryInfo" ADD CONSTRAINT "MemoryInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiskInfo" ADD CONSTRAINT "DiskInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterfaceInfo" ADD CONSTRAINT "InterfaceInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;
