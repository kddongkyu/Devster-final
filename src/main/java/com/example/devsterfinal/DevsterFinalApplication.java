package com.example.devsterfinal;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"data.*", "naver.cloud","jwt.setting.config","jwt.setting.settings","social.*","oauth2.*"})
@EnableJpaRepositories(basePackages = {"data.repository"})
@EntityScan("data.entity")

@MapperScan({"data.mapper"})
public class DevsterFinalApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevsterFinalApplication.class, args);
    }

}





