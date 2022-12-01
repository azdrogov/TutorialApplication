package io.tutorial.app.configs

import pureconfig.ConfigReader
import pureconfig.generic.semiauto.deriveReader

final case class ServerConfig(host: String,
                              port: Int)

object ServerConfig {
  implicit val reader: ConfigReader[ServerConfig] = deriveReader
}
