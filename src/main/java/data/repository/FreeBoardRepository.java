package data.repository;

import data.entity.FreeBoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoardEntity, Integer> {
    Page<FreeBoardEntity> findByFBsubjectContaining(String keyword, Pageable pageable);
}
