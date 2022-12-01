package io.tutorial.app

import doobie.postgres._
import doobie.postgres.implicits._
import doobie.ConnectionIO
import doobie.implicits._
import io.tutorial.app.api.AddTutorialRequest
import io.tutorial.app.models.Tutorial

import java.util.UUID

final class TutorialRepository {

  def list: ConnectionIO[List[Tutorial]] =
    sql"""SELECT id, title, description, published FROM "Tutorials""""
      .query[Tutorial]
      .to[List]

  def listByKeyword(keyword: String): ConnectionIO[List[Tutorial]] =
    sql"""SELECT id, title, description, published FROM "Tutorials" WHERE title LIKE $keyword"""
      .query[Tutorial]
      .to[List]

  def findById(id: String): ConnectionIO[Option[Tutorial]] =
    sql"""SELECT id, title, description, published FROM "Tutorials" WHERE id = $id"""
      .query[Tutorial]
      .option

  def insert(tutorial: AddTutorialRequest): ConnectionIO[String] = {
    val t = Tutorial(UUID.randomUUID(), tutorial.title, tutorial.description, tutorial.published)
    sql"""INSERT INTO "Tutorials" (id, title, description, published) values (${t.id}, ${t.title}, ${t.description}, ${t.published})"""
      .update
      .run
      .map(_ => t.id.toString)
  }

  def update(tutorial: Tutorial): ConnectionIO[String] =
    sql"""|UPDATE "Tutorials" SET
          |  title = ${tutorial.title},
          |  description = ${tutorial.description},
          |  published = ${tutorial.published}
          |WHERE id = ${tutorial.id.toString}""".stripMargin
      .update
      .run
      .map(_ => tutorial.id.toString)

  def delete(id: String): ConnectionIO[Int] =
    sql"""DELETE FROM "Tutorials" where id = $id"""
      .update
      .run

  def deleteAll(): ConnectionIO[Int] =
    sql"""DELETE FROM "Tutorials""""
      .update
      .run
}
