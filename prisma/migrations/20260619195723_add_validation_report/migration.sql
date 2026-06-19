-- CreateTable
CREATE TABLE "ValidationReport" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "marketDemand" TEXT NOT NULL,
    "competitionLevel" TEXT NOT NULL,
    "revenuePotential" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "risks" JSONB NOT NULL,
    "mvpFeatures" JSONB NOT NULL,
    "recommendation" TEXT NOT NULL,
    "rawReport" TEXT,
    "startupIdeaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidationReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationReport_startupIdeaId_key" ON "ValidationReport"("startupIdeaId");

-- AddForeignKey
ALTER TABLE "ValidationReport" ADD CONSTRAINT "ValidationReport_startupIdeaId_fkey" FOREIGN KEY ("startupIdeaId") REFERENCES "StartupIdea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
