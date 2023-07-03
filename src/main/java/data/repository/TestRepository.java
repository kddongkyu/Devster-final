package data.repository;

import data.entity.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<TestEntity, Integer> {
    public TestEntity findByIdx(int idx);
    public List<TestEntity> findByAge(int age);
    public List<TestEntity> findByName(String name);

}
