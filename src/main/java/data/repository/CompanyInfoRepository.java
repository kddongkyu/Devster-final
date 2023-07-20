package data.repository;

import data.entity.CompanyInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfoEntity,Integer> {

    List<CompanyInfoEntity>findByCInameContaining(String keyword);

}
