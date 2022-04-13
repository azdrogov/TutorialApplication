trait Tutorials[F[_]] {
  def insert(tutorial: Tutorial): F[String]
  def update(dev: Tutorial): F[Int]
  def delete(id: String): F[Int]

  def findAll(): F[List[Tutorial]]
}

object Tutorials {
  implicit def apply[F[_]](implicit ev: Tutorials[F]): Tutorials[F] = ev
  
  final class TutorialImpl[F[_]](service: TutorialService[F]) extends Tutorials[F] {
    override def insert(tutorial: Tutorial): F[String] = ???

    override def update(dev: Tutorial): F[Int] = ???

    override def delete(id: String): F[Int] = ???

    override def findAll(): F[List[Tutorial]] = ???
  }

  def impl[F[_]](svc: TutorialService[F]): Tutorials[F] = new TutorialImpl[F](svc)
}
