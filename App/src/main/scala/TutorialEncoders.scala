
import cats.effect.Async
import io.circe.generic.semiauto._
import io.circe.{Decoder, Encoder}
import org.http4s.{EntityDecoder, EntityEncoder}
import org.http4s.circe._


object TutorialEncoders {
  implicit val tutorialEncoder: Encoder[Tutorial] = deriveEncoder
  implicit val tutorialDecoder: Decoder[Tutorial] = deriveDecoder

  implicit def tutorialEntityDecoder[F[_]: Async]: EntityDecoder[F, Tutorial] = jsonOf[F, Tutorial]
  implicit def tutorialEntityEncoder[F[_]]: EntityEncoder[F, Tutorial] = jsonEncoderOf[F, Tutorial]

  implicit val tutorialInputEncoder: Encoder[TutorialInput] = deriveEncoder
  implicit val tutorialInputDecoder: Decoder[TutorialInput] = deriveDecoder

  implicit def tutorialInputEntityDecoder[F[_]: Async]: EntityDecoder[F, TutorialInput] = jsonOf[F, TutorialInput]
  implicit def tutorialInputEntityEncoder[F[_]]: EntityEncoder[F, TutorialInput] = jsonEncoderOf[F, TutorialInput]
}
