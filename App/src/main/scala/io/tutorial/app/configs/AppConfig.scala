package io.tutorial.app.configs

import pureconfig.ConfigReader
import pureconfig.generic.semiauto.deriveReader

case class AppConfig(dbConfig: DBConfig, serverConfig: ServerConfig)

object AppConfig {
  implicit val reader: ConfigReader[AppConfig] = deriveReader
}