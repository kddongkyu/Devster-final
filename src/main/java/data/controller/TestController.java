package data.controller;

import data.entity.TestEntity;
import data.service.TestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/test")
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    TestService testService;

    @GetMapping
    public ResponseEntity<List<TestEntity>> getAllTests(){
        List<TestEntity> list = testService.findAll();
        return new ResponseEntity<List<TestEntity>>(list, HttpStatus.OK);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<TestEntity> getTestByIdx(@PathVariable("idx") int idx){
        return new ResponseEntity<TestEntity>(testService.findByIdx(idx),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TestEntity> insert(TestEntity vo){
        return new ResponseEntity<TestEntity>(testService.insertTest(vo),HttpStatus.OK);
    }

}
