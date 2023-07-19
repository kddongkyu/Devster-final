package data.mapper;

import data.entity.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    double calculateAverageRatingByCIIdx(int ci_idx);
}
