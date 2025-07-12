-- CreateEnum
CREATE TYPE "ArchitectureType" AS ENUM ('MONOLITH', 'MICROSERVICE');

-- CreateEnum
CREATE TYPE "ServiceMode" AS ENUM ('PROXY', 'CACHE', 'MOCK', 'ADMIN');

-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('JWT', 'COOKIE', 'NONE');

-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('JSON', 'TEXT', 'HTML', 'XML', 'OTHER');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "architectureType" "ArchitectureType" NOT NULL DEFAULT 'MONOLITH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "mode" "ServiceMode" NOT NULL DEFAULT 'PROXY',
    "authMethod" "AuthMethod" NOT NULL DEFAULT 'NONE',
    "authToken" TEXT,
    "cookieName" VARCHAR(100),
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "method" "HttpMethod" NOT NULL,
    "path" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "manualResponseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "query" JSONB NOT NULL,
    "body" JSONB,
    "matchingProfile" JSONB,
    "responseCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "contentType" "ContentType" NOT NULL DEFAULT 'JSON',
    "headers" JSONB NOT NULL,
    "body" JSONB NOT NULL,
    "isFromCache" BOOLEAN NOT NULL DEFAULT false,
    "isManual" BOOLEAN NOT NULL DEFAULT false,
    "matchedScore" DOUBLE PRECISION,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Service_projectId_idx" ON "Service"("projectId");

-- CreateIndex
CREATE INDEX "Service_baseUrl_idx" ON "Service"("baseUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_manualResponseId_key" ON "Endpoint"("manualResponseId");

-- CreateIndex
CREATE INDEX "Endpoint_serviceId_idx" ON "Endpoint"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_serviceId_method_path_key" ON "Endpoint"("serviceId", "method", "path");

-- CreateIndex
CREATE UNIQUE INDEX "Request_hash_key" ON "Request"("hash");

-- CreateIndex
CREATE INDEX "Request_endpointId_idx" ON "Request"("endpointId");

-- CreateIndex
CREATE INDEX "Request_hash_idx" ON "Request"("hash");

-- CreateIndex
CREATE INDEX "Response_requestId_idx" ON "Response"("requestId");

-- CreateIndex
CREATE INDEX "Response_isFromCache_idx" ON "Response"("isFromCache");

-- CreateIndex
CREATE INDEX "Response_isManual_idx" ON "Response"("isManual");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_manualResponseId_fkey" FOREIGN KEY ("manualResponseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
