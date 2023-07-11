package data.repository;

import data.entity.CompanyMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyMemberRepository extends JpaRepository<CompanyMemberEntity,Integer> {
    boolean existsByCMemail(String cm_email);

}
