package io.tutorial.app.configs

import pureconfig.ConfigReader
import pureconfig.generic.semiauto.deriveReader

final case class DBConfig(driver: String,
                          url: String,
                          user: String,
                          pass: String)

object DBConfig {
  implicit val reader: ConfigReader[DBConfig] = deriveReader
}