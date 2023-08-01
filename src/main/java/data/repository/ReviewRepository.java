package data.repository;


import data.entity.ReviewEntity;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity,Integer> {
    public void deleteById(int rb_idx);

    Page<ReviewEntity> findByRBsubjectContaining(String keyword, Pageable pageable);


    @Query(value = "SELECT * FROM reviewboard ORDER BY rb_writeday DESC LIMIT 3", nativeQuery = true)
    List<ReviewEntity> findTop3ByOrderByRbwriteDayDesc();
}



