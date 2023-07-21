package data.repository.board.qboard;

import data.entity.QboardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QboardRepository extends JpaRepository<QboardEntity, Integer> {
}
