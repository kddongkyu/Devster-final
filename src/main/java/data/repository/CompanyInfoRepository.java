package data.repository;

import data.entity.CompanyInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfoEntity,Integer> {

    List<CompanyInfoEntity>findByCInameContaining(String keyword);

}
