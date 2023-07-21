package data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.AcademyBoardEntity;


@Repository
public interface AcademyBoardRepository extends JpaRepository<AcademyBoardEntity, Integer> {
    Page<AcademyBoardEntity> findByAIidx(int AIidx,Pageable pageable);
    Page<AcademyBoardEntity> findByABsubjectContainingAndAIidx(String keyword, int AIidx, Pageable pageable);
}