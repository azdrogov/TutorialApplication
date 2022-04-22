import cats.effect.kernel.Sync
import doobie._
import doobie.implicits._
import doobie.postgres._
import doobie.postgres.implicits._
import cats.implicits._

import java.util.UUID


case class TutorialInput(
  title: String,
  description: Option[String],
  published: Boolean
)

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

  def insert(tutorial: TutorialInput): F[String] = {
    val newId = UUID.randomUUID()
    val tutorialBody = Tutorial(newId, tutorial.title, tutorial.description, tutorial.published)
    Queries.insert(tutorialBody)
      .run
      .map(_ => newId.toString)
      .transact(trx)
  }

  def update(tutorial: Tutorial): F[String] = {
    val id = tutorial.id.toString
    Queries
      .update(tutorial)
      .run
      .map(_ => id)
      .transact(trx)
  }

  def delete(id: String): F[Int] = {
    Queries
      .delete(UUID.fromString(id))
      .run
      .transact(trx)
  }

  def getById(id: String): F[Option[Tutorial]] =
    Queries
      .getById(UUID.fromString(id))
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
    sql"SELECT id, title, description, published FROM tutorials".query[Tutorial]

  def insert(t: Tutorial): Update0 =
    sql"INSERT INTO tutorials (id, title, description, published) values (${t.id}, ${t.title}, ${t.description}, ${t.published})".update

  def update(t: Tutorial): Update0 =
    sql"""|UPDATE tutorials SET
          |  title = ${t.title},
          |  description = ${t.description},
          |  published = ${t.published}
          |WHERE id = ${t.id}""".stripMargin.update

  def delete(id: UUID) =
    sql"DELETE FROM tutorials where id = $id".update

  def getById(id: UUID) =
    sql"SELECT id, title, description, published FROM tutorials WHERE id = $id".query[Tutorial]

  def deleteAll =
    sql"TRANSCATE TABLE tutorials".update

  def findWhereContains(keywords: String) = {
    val key = s"%${keywords}%"
    sql"SELECT id, title, description, published FROM tutorials WHERE title LIKE $key ".query[Tutorial]
  }
}