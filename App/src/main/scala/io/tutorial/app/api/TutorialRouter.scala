package io.tutorial.app.api

import cats.implicits._
import cats.effect.Async
import io.tutorial.app.TutorialService
import io.tutorial.app.models.Tutorial
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl
import org.http4s.dsl.io.{QueryParamDecoderMatcher, Root}

object TutorialRouter {

  import org.http4s.circe.CirceEntityCodec._

  private val apiRoot = Root / "api"

  object TitleQueryParamMatcher extends QueryParamDecoderMatcher[String]("title")

  def routes[F[_] : Async](service: TutorialService[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] {
      case GET -> apiRoot / "tutorials" =>
        for {
          ts  <- service.list
          res <- Ok(ts)
        } yield res

      case req@POST -> apiRoot / "tutorials" =>
        for {
          t  <- req.as[AddTutorialRequest]
          id <- service.insert(t)
          rs <- Ok(id)
        } yield rs

      case GET -> apiRoot / "tutorials" / id =>
        for {
          t   <- service.findById(id)
          res <- if (t.isDefined) Ok(t) else NotFound()
        } yield res

      case req@PUT -> apiRoot / "tutorials" =>
        for {
          t   <- req.as[Tutorial]
          id  <- service.update(t)
          res <- Ok(id)
        } yield res

      case DELETE -> apiRoot / "tutorials" / id =>
        for {
          _   <- service.delete(id)
          res <- Ok(id)
        } yield res

      case DELETE -> apiRoot / "tutorials" =>
        for {
          _   <- service.deleteAll()
          res <- Ok("Удалено")
        } yield res

      case GET -> apiRoot / "tutorials" / "search" / "keywords" :? TitleQueryParamMatcher(keyWord) =>
        for {
          ts  <- service.listByKeyword(keyWord)
          res <- Ok(ts)
        } yield res
    }
  }
}
