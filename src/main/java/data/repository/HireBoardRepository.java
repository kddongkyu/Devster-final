package data.repository;

import data.entity.HireBoardEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HireBoardRepository extends JpaRepository<HireBoardEntity, Integer> {
    Long countBy();
    Page<HireBoardEntity> findByHBsubjectContaining(String keyword, Pageable pageable);

}


