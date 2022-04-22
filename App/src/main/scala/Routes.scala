import cats.effect.{Async, Sync}
import cats.implicits._
import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.dsl.io.{QueryParamDecoderMatcher, Root}

object Routes {
  import TutorialEncoders._
  import org.http4s.circe.CirceEntityCodec._

  private val apiRoot = Root / "api"

  object TitleQueryParamMatcher extends QueryParamDecoderMatcher[String]("title")

  def tutorialRoutes[F[_]: Async](tutorials: Tutorials[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._

    HttpRoutes.of[F] {
      case GET -> apiRoot / "tutorials" =>
        for {
          ts <- tutorials.getAll
          res <- Ok(ts)
        } yield res

      case req @ POST -> apiRoot / "tutorials" =>
        for {
          t <- req.as[TutorialInput]
          id <- tutorials.insert(t)
          rs <- Ok(id)
        } yield rs

      case GET -> apiRoot / "tutorials" / id =>
        for {
          t <- tutorials.getById(id)
          res <- if (t.isDefined) Ok(t) else NotFound()
        } yield res

      case req @ PUT -> apiRoot / "tutorials" =>
        for {
          t <- req.as[Tutorial]
          id <- tutorials.update(t)
          res <- Ok(id)
        } yield res

      case DELETE -> apiRoot / "tutorials" / id => {
        for {
          _ <- tutorials.delete(id)
          res <- Ok(id)
        } yield res
      }

      case DELETE -> apiRoot / "tutorials" =>
        for {
          _ <- tutorials.deleteAll()
          res <- Ok("Удалено")
        } yield res

      case GET -> apiRoot / "tutorials" / "search" / "keywords" :? TitleQueryParamMatcher(keyWord) =>
        for {
          ts <- tutorials.findByKeyWord(keyWord)
          res <- Ok(ts)
        } yield res
    }
  }
}
