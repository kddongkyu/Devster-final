package data.repository;

import data.entity.AcademyInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademyInfoRepository extends JpaRepository<AcademyInfoEntity, Integer> {
    List<AcademyInfoEntity> findAllByAInameContains(String name);
}
