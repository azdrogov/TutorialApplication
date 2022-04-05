name := "App"

version := "0.1"

scalaVersion := "3.1.2"


libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-ember-server" % "0.23.11",
  "org.http4s" %% "http4s-ember-client" % "0.23.11",
  "org.http4s" %% "http4s-dsl" % "0.23.11",
  "org.typelevel" %% "cats-core" % "2.7.0",
  "org.typelevel" %% "cats-effect" % "3.3.9",
  "io.circe" %% "circe-core" % "0.14.1",
  "io.circe" %% "circe-generic" % "0.14.1",
  "io.circe" %% "circe-parser" % "0.14.1",
  "co.fs2" %% "fs2-core" % "3.2.7",
  "ch.qos.logback" % "logback-classic" % "1.2.11" % Runtime,
  "org.tpolecat" %% "doobie-core"      % "1.0.0-RC1"
)