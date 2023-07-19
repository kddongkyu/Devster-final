package data.repository;


import data.entity.ReviewEntity;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity,Integer> {
    public void deleteById(int rb_idx);

    Page<ReviewEntity> findByRBsubjectContaining(String keyword, Pageable pageable);

}



