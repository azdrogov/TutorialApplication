import cats.effect.{ExitCode, IO, IOApp}
import doobie.util.transactor.Transactor
import pureconfig.ConfigSource
import pureconfig.generic.auto._

object Main extends IOApp {
  override def run(args: List[String]): IO[ExitCode] = {
    val config = ConfigSource.default.loadOrThrow[Configurations]
    val (serviceConf, serverConf) = (config.serviceCfg, config.serverCfg)
    val transactor = Transactor.fromDriverManager[IO](serviceConf.driver, serviceConf.url, serviceConf.user, serviceConf.pass)

    TutorialServer.stream[IO](transactor, serverConf).compile.drain.as(ExitCode.Success)
  }
}
