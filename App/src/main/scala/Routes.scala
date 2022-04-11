import cats.effect.Sync
import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.dsl.io.{QueryParamDecoderMatcher, Root}

object Routes {

  private def apiRoot = Root / "api"

  object TitleQueryParamMatcher extends QueryParamDecoderMatcher[String]("title")

  def tutorialRoutes[F[_]: Sync]: HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> apiRoot / "tutorials" =>
        Ok("Hello")

      case POST -> apiRoot / "tutorials" => Ok("POST -> apiRoot / \"tutorials\"")

      case GET -> apiRoot / "tutorials" / id => Ok(s"GET apiRoot / \"tutorials\" / $id")

      case PUT -> apiRoot / "tutorials" / id => Ok(s"PUT apiRoot / \"tutorials\" / $id")

      case DELETE -> apiRoot / "tutorials" / id => Ok(s"DELETE apiRoot / \"tutorials\" / $id")

      case DELETE -> apiRoot / "tutorials" => Ok(s"DELETE apiRoot / \"tutorials\"")

      case GET -> apiRoot / "tutorials" / "keywords" :? TitleQueryParamMatcher(title) => Ok(s"GET apiRoot / \"tutorials\" 11 $title")
    }
  }
}
