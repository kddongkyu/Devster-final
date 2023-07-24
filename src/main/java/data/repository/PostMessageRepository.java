package data.repository;

import data.entity.PostMessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostMessageRepository extends JpaRepository<PostMessageEntity, Integer> {

    Page<PostMessageEntity> findAllByRECVnick(String nickname, Pageable pageable);
//    List<PostMessageEntity> findAllByRECVnick(String nickname);
    void deleteAllByRECVnick(String nickname);
}
