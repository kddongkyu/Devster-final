package data.repository;

import data.entity.CompanyMemberEntity;
import data.entity.MemberEntity;
import jwt.setting.config.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyMemberRepository extends JpaRepository<CompanyMemberEntity,Integer> {
    boolean existsByCMemail(String cm_email);

    boolean existsByCMcompname(String cm_compname);

    Optional<CompanyMemberEntity> findByCMemail(String cm_email);
    Optional<CompanyMemberEntity> findByCMcompname(String cm_compname);
    Optional<CompanyMemberEntity> findByCMrefreshtoken(String cm_refreshtoken);

}
