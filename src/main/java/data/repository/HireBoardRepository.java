package data.repository;

import data.entity.HireBoardEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HireBoardRepository extends JpaRepository<HireBoardEntity, Integer> {
    Long countBy();
    // Page<HireBoardEntity> findAll(Pageable pageable);
    // public HireBoardEntity findByHbIdx(int hbIdx);

}


