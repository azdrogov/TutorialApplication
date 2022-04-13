import cats.effect.kernel.{Async, Resource}
import cats.syntax.all._
import com.comcast.ip4s._
import doobie.util.transactor.Transactor
import fs2.Stream
import org.http4s.ember.client.EmberClientBuilder
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.server.middleware.Logger
import org.http4s.implicits._

object TutorialServer {
  def stream[F[_]: Async](transactor: Transactor[F], serverConf: ServerConf): Stream[F, Nothing] = {
    for {
      _ <- Stream.resource(EmberClientBuilder.default[F].build)

      svc = new TutorialService[F](transactor)
      tutorialAlg = Tutorials.impl(svc)
      httpApp = (Routes.tutorialRoutes[F]).orNotFound
      finalHttpApp = Logger.httpApp(true, true)(httpApp)
      
      exitCode <- Stream.resource(
        EmberServerBuilder.default[F]
          .withHost(Host.fromString(serverConf.host).getOrElse(ipv4"0.0.0.0"))
          .withPort(Port.fromInt(serverConf.port).getOrElse(port"8080"))
          .withHttpApp(finalHttpApp)
          .build >>
        Resource.eval(Async[F].never)
      )
    } yield exitCode
  }.drain
}
