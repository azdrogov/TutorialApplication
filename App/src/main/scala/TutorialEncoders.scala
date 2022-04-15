import cats.effect.IO
import io.circe.generic.semiauto._
import io.circe.{Decoder, Encoder, HCursor, Json}
import org.http4s.{EntityDecoder, EntityEncoder}
import org.http4s.circe._

import java.util.UUID

object TutorialEncoders {

  implicit val UUIDFormat: Encoder[UUID] with Decoder[UUID] =
    new Encoder[UUID] with Decoder[UUID] {
      override def apply(a: UUID): Json                    = Encoder.encodeString.apply(a.toString)
      override def apply(c: HCursor): Decoder.Result[UUID] =
        Decoder.decodeString.map(s => UUID.fromString(s)).apply(c)
    }

  implicit val deviceEncoder: Encoder[Tutorial] = deriveEncoder[Tutorial]
  implicit val deviceDecoder: Decoder[Tutorial] = deriveDecoder[Tutorial]

  implicit def deviceEntityDecoder: EntityDecoder[IO, Tutorial] = jsonOf[IO, Tutorial]
  implicit def deviceEntityEncoder: EntityEncoder[IO, Tutorial] = jsonEncoderOf[IO, Tutorial]
}
