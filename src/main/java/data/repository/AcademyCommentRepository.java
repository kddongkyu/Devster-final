package data.repository;

import data.entity.ReviewCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.AcademyCommentEntity;

import java.util.List;

@Repository
public interface AcademyCommentRepository extends JpaRepository<AcademyCommentEntity, Integer>{
    List<AcademyCommentEntity> findALLByABidxAndABcrefEqualsOrderByABcwritedayDesc(int ABidx, int ABcref);
    List<AcademyCommentEntity> findAllByABcrefOrderByABcwritedayDesc(int ab_idx);
    int countAllByABidx (int ab_idx);
    int countAllByABcref(int abc_idx);
    void deleteAllByABcref (int abc_idx);
}



