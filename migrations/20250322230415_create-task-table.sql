-- Create "task" table
CREATE TABLE "public"."task"
(
    "id"           serial NOT NULL,
    "name"         character varying(255) NULL,
    "is_completed" boolean NULL,
    PRIMARY KEY ("id")
);
