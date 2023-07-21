package data.repository.board.qboard;

import data.entity.QboardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QboardLikeRespository extends JpaRepository<QboardLikeEntity, Integer> {
    Optional<QboardLikeEntity> findByMIdxAndQBidx(int MIdx, int QBidx);
}
