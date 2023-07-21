package data.repository.resume;


import data.entity.resume.ResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<ResumeEntity, Integer> {
    List<ResumeEntity> findAllByRStatus(int status);
    Optional<ResumeEntity> findByMIdx(int m_idx);
}
