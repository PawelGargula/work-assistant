-- Reorder TaskStatus
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;

ALTER TYPE "TaskStatus" RENAME TO "TasksStatusOld";

CREATE TYPE "TaskStatus" AS ENUM ('TRACKING', 'NOTTRACKING', 'COMPLETED');

ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus" USING ("status"::text::"TaskStatus");

ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'NOTTRACKING';

DROP TYPE "TasksStatusOld";