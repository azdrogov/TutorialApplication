package io.tutorial.app

import cats.effect.{ExitCode, IO, IOApp}
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import io.tutorial.app.configs.AppConfig
import pureconfig.ConfigSource

object Main extends IOApp {
  override def run(args: List[String]): IO[ExitCode] = {
    val conf = ConfigSource.default.loadOrThrow[AppConfig]
    val dbConf = conf.dbConfig

    implicit val transactor: Aux[IO, Unit] =
      Transactor.fromDriverManager[IO](dbConf.driver, dbConf.url, dbConf.user, dbConf.pass)

    TutorialServer
      .start[IO](conf.serverConfig)
      .compile
      .drain
      .as(ExitCode.Success)
  }
}
