package data.repository;

import data.entity.FreeBoardEntity;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoardEntity, Integer> {
    // subject, content 통합 search 메서드
    @Query("SELECT f FROM freeboard f WHERE f.FBsubject LIKE %:keyword% OR f.FBcontent LIKE %:keyword%")
    Page<FreeBoardEntity> findByFBsubjectContainingOrFBcontentContaining(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM freeboard ORDER BY fb_like DESC LIMIT 2", nativeQuery = true)
    List<FreeBoardEntity> findTopByOrderByFbLikeDesc();

    @Query(value = "SELECT * FROM freeboard ORDER BY fb_writeday DESC LIMIT 3", nativeQuery = true)
    List<FreeBoardEntity> findTop3ByOrderByFbwriteDayDesc();
}
