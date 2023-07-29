package data.repository;

import data.entity.HireBoardEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface HireBoardRepository extends JpaRepository<HireBoardEntity, Integer> {
    Long countBy();
    Page<HireBoardEntity> findByHBsubjectContaining(String keyword, Pageable pageable);
    @Query("SELECT h FROM hireboard h WHERE h.HBsubject LIKE %:keyword% OR h.HBcontent LIKE %:keyword%")
    Page<HireBoardEntity> findByHBsubjectContainingOrHBcontentContaining(@Param("keyword") String keyword, Pageable pageable);

}


