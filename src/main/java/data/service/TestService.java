package data.service;

import data.entity.TestEntity;
import data.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public TestEntity insertTest(TestEntity vo){
        testRepository.save(vo);
        return vo;
    }

    public void deleteTest(int idx){
        testRepository.deleteById(idx);
    }

    public List<TestEntity> findAll(){
        List<TestEntity> list = new ArrayList<>(testRepository.findAll());
        return list;
    }

    public Optional<TestEntity> findOnePerson(int idx) {
       return testRepository.findById(idx);
    }

    public TestEntity findByIdx(int idx){
        return testRepository.findByIdx(idx);
    }

    public void updateTest(TestEntity vo){
        Optional<TestEntity> e = testRepository.findById(vo.getIdx());

        if(e.isPresent()) {
            e.get().setIdx(vo.getIdx());
            e.get().setName(vo.getName());
            e.get().setAge(vo.getAge());
            testRepository.save(vo);
        }
    }

}
