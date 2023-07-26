package data.repository;

import data.entity.AcademyCommentEntity;
import data.entity.ReviewCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewCommentRepository extends JpaRepository<ReviewCommentEntity, Integer> {
    List<ReviewCommentEntity> findALLByRBidxAndRBcrefEqualsOrderByRBcwritedayDesc(int RBidx, int RBcref);
    List<ReviewCommentEntity> findAllByRBcrefOrderByRBcwritedayDesc(int rb_idx);
    int countAllByRBidx (int rb_idx);
    int countAllByRBcref(int rbc_idx);
    void deleteAllByRBcref (int rbc_idx);
}
