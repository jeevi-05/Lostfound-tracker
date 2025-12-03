package com.examly.springapp.service;

import com.examly.springapp.entity.Role;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminInitService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin if not exists
        if (!userRepository.existsByEmail("admin@university.edu")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@university.edu");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setVerified(true);
            userRepository.save(admin);
            System.out.println("Default admin created: admin@university.edu / admin123");
        }
    }
}