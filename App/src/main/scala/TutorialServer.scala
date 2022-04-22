import cats.effect.kernel.Async
import doobie.util.transactor.Transactor
import fs2.Stream
import org.http4s.blaze.client.BlazeClientBuilder
import org.http4s.blaze.server.BlazeServerBuilder
import org.http4s.server.middleware.Logger
import org.http4s.implicits._

object TutorialServer {
  def stream[F[_]: Async](transactor: Transactor[F], serverConf: ServerConf): Stream[F, Nothing] = {
    for {
      _ <- BlazeClientBuilder[F].stream

      svc = new TutorialService[F](transactor)
      tutorialAlg = Tutorials.impl(svc)
      httpApp = Routes.tutorialRoutes[F](tutorialAlg).orNotFound
      finalHttpApp = Logger.httpApp(true, true)(httpApp)
      
      exitCode <- BlazeServerBuilder[F]
                    .bindHttp(serverConf.port, serverConf.host)
                    .withHttpApp(finalHttpApp)
                    .serve
    } yield exitCode
  }.drain
}
