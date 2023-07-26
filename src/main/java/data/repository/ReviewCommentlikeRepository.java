package data.repository;

import data.entity.ReviewCommentlikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewCommentlikeRepository extends JpaRepository<ReviewCommentlikeEntity,Integer> {
    Optional<ReviewCommentlikeEntity> findByMIdxAndRBcidx(int Midx,int RBcidx);
}
