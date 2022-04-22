trait Tutorials[F[_]] {
  def insert(tutorial: TutorialInput): F[String]
  def update(tutorial: Tutorial): F[String]
  def delete(id: String): F[Int]

  def getAll: F[List[Tutorial]]
  def getById(id: String): F[Option[Tutorial]]
  def deleteAll(): F[Unit]
  def findByKeyWord(keyword: String): F[List[Tutorial]]
}

object Tutorials {
  implicit def apply[F[_]](implicit ev: Tutorials[F]): Tutorials[F] = ev
  
  final class TutorialImpl[F[_]](service: TutorialService[F]) extends Tutorials[F] {
    override def insert(tutorial: TutorialInput): F[String] = service.insert(tutorial)

    override def update(tutorial: Tutorial): F[String] = service.update(tutorial)

    override def delete(id: String): F[Int] = service.delete(id)

    override def getAll: F[List[Tutorial]] = service.getAll

    override def getById(id: String): F[Option[Tutorial]] = service.getById(id)

    override def deleteAll(): F[Unit] = service.deleteAll()

    override def findByKeyWord(keyword: String): F[List[Tutorial]] = service.findByKeyword(keyword)
  }

  def impl[F[_]](svc: TutorialService[F]): Tutorials[F] = new TutorialImpl[F](svc)
}
