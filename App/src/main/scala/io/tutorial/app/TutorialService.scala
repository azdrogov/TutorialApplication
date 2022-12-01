package io.tutorial.app

import cats.effect.kernel.MonadCancelThrow
import cats.implicits._
import doobie.implicits._
import doobie.util.transactor.Transactor
import io.tutorial.app.api.AddTutorialRequest
import io.tutorial.app.models.Tutorial

trait TutorialService[F[_]] {
  def list: F[List[Tutorial]]

  def listByKeyword(keyword: String): F[List[Tutorial]]

  def findById(id: String): F[Option[Tutorial]]

  def insert(tutorial: AddTutorialRequest): F[String]

  def update(tutorial: Tutorial): F[String]

  def delete(id: String): F[Int]

  def deleteAll(): F[Unit]
}

object TutorialService {
  implicit def apply(implicit ev: TutorialRepository): TutorialRepository = ev

  final class TutorialServiceImpl[F[_]: MonadCancelThrow](repo: TutorialRepository)(implicit xa: Transactor[F]) extends TutorialService[F] {
    override def list: F[List[Tutorial]] =
      repo.list.transact(xa)

    override def listByKeyword(keyword: String): F[List[Tutorial]] =
      repo.listByKeyword(keyword).transact(xa)

    override def findById(id: String): F[Option[Tutorial]] =
      repo.findById(id).transact(xa)

    override def insert(tutorial: AddTutorialRequest): F[String] =
      repo.insert(tutorial).transact(xa)

    override def update(tutorial: Tutorial): F[String] =
      repo.update(tutorial).transact(xa)

    override def delete(id: String): F[Int] =
      repo.delete(id).transact(xa)

    override def deleteAll(): F[Unit] =
      repo.deleteAll().transact(xa).map(_ => ())
  }

  def impl[F[_]: MonadCancelThrow](repository: TutorialRepository)(implicit xa: Transactor[F]): TutorialService[F] =
    new TutorialServiceImpl[F](repository)
}
