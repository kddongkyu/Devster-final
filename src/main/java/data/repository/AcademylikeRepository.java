package data.repository;

import data.entity.AcademylikeEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademylikeRepository extends JpaRepository<AcademylikeEntity, Integer>{
    Optional<AcademylikeEntity> findByABidxAndMIdx(int ABidx, int MIdx);
}