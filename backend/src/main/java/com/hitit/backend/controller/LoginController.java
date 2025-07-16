package com.hitit.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.dto.UserDto;
import com.hitit.backend.entity.User;
import com.hitit.backend.repository.UserRepository;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı bulunamadı");
        }

        User user = optionalUser.get();

        if (user.getPassword().equals(userDto.getPassword())) {
            return ResponseEntity.ok("Login başarılı!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre yanlış");
        }
    }

    


   


}
