-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "resume_url" TEXT;

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "description" TEXT,
ADD COLUMN     "projects_count" INTEGER,
ADD COLUMN     "years_of_experience" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "project_architecture_nodes" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "node_type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "responsibilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "challenges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "solutions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "project_architecture_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover_image" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "published_at" DATE NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_architecture_nodes_project_id_idx" ON "project_architecture_nodes"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_profile_id_idx" ON "articles"("profile_id");

-- AddForeignKey
ALTER TABLE "project_architecture_nodes" ADD CONSTRAINT "project_architecture_nodes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
