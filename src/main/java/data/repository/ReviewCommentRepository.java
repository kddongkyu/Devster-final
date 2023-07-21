package data.repository;

import data.entity.AcademyCommentEntity;
import data.entity.ReviewCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewCommentRepository extends JpaRepository<ReviewCommentEntity, Integer> {
}
