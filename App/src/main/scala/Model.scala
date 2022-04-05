import cats.effect.kernel.Sync

import doobie._
import doobie.implicits._
import doobie.implicits.javasql._
import doobie.util.query.Query0
import cats.effect._

import java.util.UUID

case class Tutorial(
  id: UUID,
  title: String,
  description: Option[String],
  published: Boolean
)

final class TutorialService[F[_]: Sync](trx: Transactor[F]) {
  def insert(tutorial: Tutorial): F[String] = {
    Queries

  }
}

private object Queries {
  implicit val logHandler = LogHandler.jdkLogHandler

  def insert(tutorial: Tutorial): Update0 =
    sql"""|insert into tutorial(id, title, description, published)
          | values($(tutorial.id), $(tutorial.title), $(tutorial.description), $(tutorial.published))
          |""".stripMargin.update
}