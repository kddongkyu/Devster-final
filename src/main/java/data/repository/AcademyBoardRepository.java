package data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import data.entity.AcademyBoardEntity;


@Repository
public interface AcademyBoardRepository extends JpaRepository<AcademyBoardEntity, Integer> {
    
}