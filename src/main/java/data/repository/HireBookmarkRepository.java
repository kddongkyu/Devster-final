package data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.HireBookmarkEntity;

@Repository
public interface HireBookmarkRepository extends JpaRepository<HireBookmarkEntity, Integer>{
    Optional<HireBookmarkEntity> findByHBidxAndMIdx(int HBidx, int MIdx);
}

