package com.example.ex1task1;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloGuys {
    /**
     * EX1: Hello guys!!!
     * @return Example string: "Hello guys!!!"
     */
    @RequestMapping("/helloguys")
    public String index() {
        return "Hello, guys!";
    }

    @RequestMapping("/list")
    public String list()
    {
        return "Hello, list!";
    }
}