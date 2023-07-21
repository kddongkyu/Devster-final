package data.repository;

import data.entity.PostMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostMessageRepository extends JpaRepository<PostMessageEntity, Integer> {

    List<PostMessageEntity> findAllByRECVnick(String nickname);
    void deleteAllByRECVnick(String nickname);
}
