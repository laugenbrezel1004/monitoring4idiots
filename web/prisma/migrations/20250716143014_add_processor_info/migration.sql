-- CreateTable
CREATE TABLE "ProcessorInfo" (
    "cores" INTEGER NOT NULL DEFAULT 0,
    "usage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hostId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessorInfo_pkey" PRIMARY KEY ("hostId","timestamp")
);

-- AddForeignKey
ALTER TABLE "ProcessorInfo" ADD CONSTRAINT "ProcessorInfo_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;
