package data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.AcademyCommentLikeEntity;

@Repository
public interface AcademyCommentLikeRepository extends JpaRepository<AcademyCommentLikeEntity, Integer>{
    Optional<AcademyCommentLikeEntity> findByABcidxAndMIdx(int ABcidx, int MIdx);
}
