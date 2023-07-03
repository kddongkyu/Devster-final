package data.entity;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "test")
public class TestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private int idx;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Builder
    public TestEntity(String name, int age){
        this.name = name;
        this.age = age;
    }
}
