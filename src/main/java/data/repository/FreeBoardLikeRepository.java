package data.repository;

import data.entity.FreeBoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface FreeBoardLikeRepository extends JpaRepository<FreeBoardLikeEntity, Integer> {
    Optional<FreeBoardLikeEntity> findByMIdxAndFBidx(int MIdx, int FBidx);
}
