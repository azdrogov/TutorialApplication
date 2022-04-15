import cats.effect.kernel.Sync
import doobie._
import doobie.implicits._
import doobie.postgres._
import doobie.postgres.implicits._
import cats.implicits._

import java.util.UUID

case class Tutorial(
  id: UUID,
  title: String,
  description: Option[String],
  published: Boolean
)

final class TutorialService[F[_]: Sync](trx: Transactor[F]) {

  def getAll: F[List[Tutorial]] =
    Queries
      .getAll
      .to[List]
      .transact(trx)

  def insert(tutorial: Tutorial): F[String] = {
    val newId = UUID.randomUUID().toString
    Queries.insert(tutorial)
      .run
      .map(_ => newId)
      .transact(trx)
  }

  def update(tutorial: Tutorial): F[Unit] =
    Queries
      .update(tutorial)
      .run
      .transact(trx)
      .void

  def delete(id: String): F[Int] =
    Queries
      .delete(id)
      .run
      .transact(trx)

  def getById(id: String): F[Option[Tutorial]] =
    Queries
      .getById(id)
      .option
      .transact(trx)

  def deleteAll(): F[Unit] =
    Queries
      .deleteAll
      .run
      .transact(trx)
      .void

  def findByKeyword(keyword: String): F[List[Tutorial]] =
    Queries
      .findWhereContains(keyword)
      .to[List]
      .transact(trx)
}

private object Queries {
  implicit val logHandler: LogHandler = LogHandler.jdkLogHandler

  def getAll =
    sql"SELECT id, title, description, published FROM tutorial".query[Tutorial]

  def insert(t: Tutorial): Update0 =
    sql"INSERT INTO tutorial (id, title, description, published) values (${t.id}, t.title, t.description, t.published)".update

  def update(t: Tutorial): Update0 =
    sql"""|UPDATE tutorial SET
          |  title = ${t.title},
          |  description = ${t.description},
          |  published = ${t.published}
          |WHERE id = ${t.id}""".stripMargin.update

  def delete(id: String) =
    sql"DELETE FROM tutorial where id = $id".update

  def getById(id: String) =
    sql"SELECT id, title, description, published FROM tutorial WHERE id = $id".query[Tutorial]

  def deleteAll =
    sql"TRANSCATE TABLE tutorial".update

  def findWhereContains(keywords: String) =
    sql"SELECT id, title, description, published FROM tutorial WHERE id LIKE '%${keywords}%' ".query[Tutorial]
}