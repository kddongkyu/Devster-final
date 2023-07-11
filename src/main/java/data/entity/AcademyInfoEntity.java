package data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "academyinfo")
@Builder
public class AcademyInfoEntity {
    @Id
    @Column(name = "ai_idx")
    private int AIidx;

    @Column(name = "ai_name")
    private String AIname;
}
