package data.repository.resume;


import data.entity.resume.ResumeCareerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeCareerRepository extends JpaRepository<ResumeCareerEntity, Integer> {
    Optional<List<ResumeCareerEntity>> findAllByMIdx(int m_idx);

    void deleteAllByMIdx(int m_idx);

}
