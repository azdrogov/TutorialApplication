case class Port(number: Int) extends AnyVal

case class ServiceConf(
  driver: String,
  url: String,
  user: String,
  pass: String
)

case class ServerConf(
  host: String,
  port: Int,
)

case class Configurations(serviceCfg: ServiceConf, serverCfg: ServerConf)
