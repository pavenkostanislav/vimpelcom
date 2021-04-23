package com.example.ex1task1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Ex1Task1Application {

	/**
	 * EX1: Hello World!!!
	 * EX2: GET: Getter lessons list / in memory from cache in file
	 * EX2: POST: Post new lesson / validation / in memory / cache in file
	 * EX2: PUT: Post item lesson / validation / in memory / cache in file
	 * @return Example string
	 */
	public static void main(String[] args) {
		SpringApplication.run(Ex1Task1Application.class, args);
	}
}
