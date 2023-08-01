package data.repository.board.qboard;

import data.entity.QboardEntity;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QboardRepository extends JpaRepository<QboardEntity, Integer> {
    @Query("SELECT f FROM qboard f WHERE f.QBsubject LIKE %:keyword% OR f.QBcontent LIKE %:keyword%")
    Page<QboardEntity> findByQBsubjectContainingOrQBcontentContaining(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM qboard ORDER BY qb_like DESC LIMIT 1", nativeQuery = true)
    QboardEntity findTopByOrderByQbLikeDesc();

    @Query(value = "SELECT * FROM qboard ORDER BY qb_writeday DESC LIMIT 3", nativeQuery = true)
    List<QboardEntity> findTop3ByOrderByQbwriteDayDesc();
}
