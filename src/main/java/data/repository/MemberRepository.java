package data.repository;

import data.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    boolean existsByMEmail(String m_email);
    boolean existsByMId(String id);
}
