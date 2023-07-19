package data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.AcademyCommentEntity;

@Repository
public interface AcademyCommentRepository extends JpaRepository<AcademyCommentEntity, Integer>{
    int countBy();

    // @Query(value = "SELECT a, b FROM AcademyCommentEntity a " + 
    //    "LEFT JOIN MemberEntity b ON a.m_idx = b.m_idx " + 
    //    "WHERE m_idx = :m_idx")
    // Optional<AcademyCommentEntity> findById(@Param("m_idx") int m_idx);
}



