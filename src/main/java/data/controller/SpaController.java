package data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
@Controller
public class SpaController {
    @RequestMapping({ "/{path:[^\\.]*}" })
    public String redirect(HttpServletRequest request) {
        // API 요청인 경우 Spring Boot가 처리하도록 함
        if (request.getRequestURI().startsWith("/api")) {
            return "forward:/";
        }

        // 그 외의 요청은 모두 React 애플리케이션으로 리다이렉트
        return "forward:/index.html";
    }
}





