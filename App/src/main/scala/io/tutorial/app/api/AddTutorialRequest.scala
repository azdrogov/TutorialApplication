package io.tutorial.app.api

import cats.effect.Async
import io.circe.generic.semiauto._
import io.circe.{Decoder, Encoder}
import org.http4s.circe._
import org.http4s.{EntityDecoder, EntityEncoder}

final case class AddTutorialRequest(title: String,
                                    description: Option[String],
                                    published: Boolean)

object AddTutorialRequest {
  implicit val tutorialInputEncoder: Encoder[AddTutorialRequest] = deriveEncoder
  implicit val tutorialInputDecoder: Decoder[AddTutorialRequest] = deriveDecoder

  implicit def tutorialInputEntityDecoder[F[_]: Async]: EntityDecoder[F, AddTutorialRequest] = jsonOf[F, AddTutorialRequest]
  implicit def tutorialInputEntityEncoder[F[_]]: EntityEncoder[F, AddTutorialRequest] = jsonEncoderOf[F, AddTutorialRequest]
}
