package data.repository.resume;

import data.entity.resume.ResumeLicenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeLicenseRepository extends JpaRepository<ResumeLicenseEntity, Integer> {
    Optional<List<ResumeLicenseEntity>> findAllByMIdx(int m_idx);

    void deleteAllByMIdx(int m_idx);

}
