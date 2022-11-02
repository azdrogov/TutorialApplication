name := "App"

version := "0.1"

scalaVersion := "2.13.3"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-blaze-server" % "0.23.11",
  "org.http4s" %% "http4s-blaze-client" % "0.23.11",
  "org.http4s" %% "http4s-dsl" % "0.23.11",
  "org.http4s" %% "http4s-circe" % "0.23.11",
  "org.typelevel" %% "cats-core" % "2.7.0",
  "org.typelevel" %% "cats-effect" % "3.3.9",
  "io.circe" %% "circe-core" % "0.14.1",
  "io.circe" %% "circe-generic" % "0.14.1",
  "io.circe" %% "circe-parser" % "0.14.1",
  "co.fs2" %% "fs2-core" % "3.2.7",
  "io.estatico" %% "newtype" % "0.4.4",
  "org.tpolecat" %% "doobie-core"      % "1.0.0-RC1",
  "org.tpolecat" %% "doobie-postgres"  % "1.0.0-RC1",
  "com.github.pureconfig" %% "pureconfig" % "0.17.1",
  "ch.qos.logback" % "logback-classic" % "1.2.11" % Runtime
)