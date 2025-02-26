import { Migration } from '@mikro-orm/migrations';

export class Migration20250226154818 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "profiles" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null);`);

    this.addSql(`create table "notification_entity" ("id" serial primary key, "profile_id" int not null, "type" smallint not null, "body" text null, "date" timestamptz not null, "read" boolean not null default false);`);

    this.addSql(`create table "build_entity" ("id" serial primary key, "author_id" int not null, "date" date not null, "likes" int not null default 0, "name" varchar(60) not null, "images" text[] not null, "download_link" varchar(100) null, "description" text null);`);

    this.addSql(`create table "submission_entity" ("id" serial primary key, "author_id" int not null, "date" date not null, "likes" int not null default 0);`);

    this.addSql(`create table "comment_entity" ("id" serial primary key, "author_id" int not null, "date" date not null, "likes" int not null default 0, "parent_submission_id" int not null, "body" varchar(900) not null);`);

    this.addSql(`alter table "notification_entity" add constraint "notification_entity_profile_id_foreign" foreign key ("profile_id") references "profiles" ("id") on update cascade;`);

    this.addSql(`alter table "build_entity" add constraint "build_entity_author_id_foreign" foreign key ("author_id") references "profiles" ("id") on update cascade;`);

    this.addSql(`alter table "submission_entity" add constraint "submission_entity_author_id_foreign" foreign key ("author_id") references "profiles" ("id") on update cascade;`);

    this.addSql(`alter table "comment_entity" add constraint "comment_entity_author_id_foreign" foreign key ("author_id") references "profiles" ("id") on update cascade;`);
    this.addSql(`alter table "comment_entity" add constraint "comment_entity_parent_submission_id_foreign" foreign key ("parent_submission_id") references "submission_entity" ("id") on update cascade;`);
  }

}
