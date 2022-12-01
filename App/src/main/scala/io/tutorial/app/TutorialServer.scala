package io.tutorial.app

import cats.effect.ExitCode
import cats.effect.kernel.Async
import doobie.util.transactor.Transactor
import io.tutorial.app.api.TutorialRouter
import io.tutorial.app.configs.ServerConfig
import org.http4s.blaze.server.BlazeServerBuilder
import org.http4s.server.middleware.{CORS, Logger}

object TutorialServer {
  def start[F[_] : Async](serverConf: ServerConfig)(implicit xa: Transactor[F]): fs2.Stream[F, ExitCode] = {

    val repo = new TutorialRepository
    val service = TutorialService.impl[F](repo)
    val httpApp = TutorialRouter.routes[F](service).orNotFound
    val corsPolicy = CORS.policy.withAllowOriginAll.withAllowCredentials(false).apply(httpApp)
    val finalHttpApp = Logger.httpApp(logHeaders = true, logBody = true)(corsPolicy)

    BlazeServerBuilder[F]
      .bindHttp(serverConf.port, serverConf.host)
      .withHttpApp(finalHttpApp)
      .serve
  }
}
