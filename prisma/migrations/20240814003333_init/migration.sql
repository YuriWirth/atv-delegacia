-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('ArmaBranca', 'ArmaDeFogo');

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "codigo" TEXT NOT NULL,
    "criminoso_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criminoso" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,

    CONSTRAINT "criminoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "armas" (
    "id" UUID NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "crime_id" UUID NOT NULL,

    CONSTRAINT "armas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "armas" ADD CONSTRAINT "armas_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
