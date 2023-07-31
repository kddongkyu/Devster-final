package data.repository;

import data.entity.FboardCommentLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FboardCommentLikeRepository extends JpaRepository<FboardCommentLikeEntity,Integer> {
    Optional<FboardCommentLikeEntity> findByMIdxAndFBcidx(int Midx, int FBcidx);
}
