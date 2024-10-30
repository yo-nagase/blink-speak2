-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "target_language" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
