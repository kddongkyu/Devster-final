package data.repository;

import data.entity.ReviewlikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ReviewlikeRepository extends JpaRepository<ReviewlikeEntity,Integer> {
    Optional<ReviewlikeEntity> findByMIdxAndRBidx(int MIdx, int RBidx);

}
