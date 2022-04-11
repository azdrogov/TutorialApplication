trait Tutorials[F[_]] {
  def insert(tutorial: Tutorial): F[String]
  def update(dev: Tutorial): F[Int]
  def delete(id: String): F[Int]

  def findAll(): F[List[Tutorial]]
}

object Tutorials {
  implicit def apply[F[_]](implicit ev: Tutorials[F]): Tutorials[F] = ev
  
  final class TutorialImpl[F[_]](service: TutorialService[F])
}
