package com.hitit.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.entity.User;
import com.hitit.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {

        if (userRepository.existsById(username)) {

            userRepository.deleteById(username);

            return ResponseEntity.ok("User deleted");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
    }


    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (userRepository.existsById(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User created");
    }





}
