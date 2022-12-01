package io.tutorial.app.models

import cats.effect.Async
import io.circe.generic.semiauto._
import io.circe.{Decoder, Encoder}
import org.http4s.circe._
import org.http4s.{EntityDecoder, EntityEncoder}

import java.util.UUID

final case class Tutorial(id: UUID,
                          title: String,
                          description: Option[String],
                          published: Boolean)

object Tutorial {
  implicit val tutorialEncoder: Encoder[Tutorial] = deriveEncoder
  implicit val tutorialDecoder: Decoder[Tutorial] = deriveDecoder

  implicit def tutorialEntityDecoder[F[_] : Async]: EntityDecoder[F, Tutorial] = jsonOf[F, Tutorial]
  implicit def tutorialEntityEncoder[F[_]]: EntityEncoder[F, Tutorial] = jsonEncoderOf[F, Tutorial]
}