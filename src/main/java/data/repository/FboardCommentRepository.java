package data.repository;

import data.entity.FboardCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FboardCommentRepository extends JpaRepository<FboardCommentEntity, Integer> {
    List<FboardCommentEntity> findAllByFBidxAndFBcrefEqualsOrderByFBcwritedayDesc(int FBidx, int FBcref);
    List<FboardCommentEntity> findAllByFBcrefOrderByFBcwritedayDesc(int fb_idx);
    int countAllByFBidx(int fb_idx);
    int countAllByFBcref(int fbc_idx);
    void deleteAllByFBcref(int fbc_idx);
}
