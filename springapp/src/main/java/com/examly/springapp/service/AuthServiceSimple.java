package com.examly.springapp.service;

import com.examly.springapp.dto.AuthRequest;
import com.examly.springapp.dto.AuthResponse;
import com.examly.springapp.dto.RegisterRequest;
import com.examly.springapp.entity.User;
import com.examly.springapp.entity.VerificationToken;
import com.examly.springapp.entity.Role;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.VerificationTokenRepository;
import com.examly.springapp.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthServiceSimple {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(AuthRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = tokenProvider.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole().name());
    }

    public String register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.STUDENT);
        user.setVerified(true); // Auto verify for testing
        userRepository.save(user);

        // Generate real verification token
        VerificationToken vt = tokenRepository.findByUser(user).orElseGet(VerificationToken::new);
        vt.setToken(UUID.randomUUID().toString());
        vt.setUser(user);
        vt.setExpiryDate(LocalDateTime.now().plusDays(2));
        vt.setUsed(false);
        tokenRepository.save(vt);

        return vt.getToken();
    }

    public String verifyAccount(String token) {
        VerificationToken vt = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));
        if (vt.isUsed()) {
            return "Token already used";
        }
        if (vt.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token expired");
        }
        User u = vt.getUser();
        u.setVerified(true);
        userRepository.save(u);
        vt.setUsed(true);
        tokenRepository.save(vt);
        return "Account verified";
    }

    public String debugUser(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return "User not found";
        }
        return "User: " + user.getEmail() + ", Verified: " + user.isVerified() + ", Password set: " + (user.getPassword() != null);
    }

    // public String createAdmin(RegisterRequest req) {
    //     if (userRepository.existsByEmail(req.getEmail())) {
    //         throw new IllegalArgumentException("Email already in use");
    //     }

    //     User user = new User();
    //     user.setName(req.getName());
    //     user.setEmail(req.getEmail());
    //     user.setPassword(passwordEncoder.encode(req.getPassword()));
    //     user.setRole(Role.ADMIN);
    //     user.setVerified(true);
    //     userRepository.save(user);

    //     // Generate verification token
    //     VerificationToken vt = new VerificationToken();
    //     vt.setToken(UUID.randomUUID().toString());
    //     vt.setUser(user);
    //     vt.setExpiryDate(LocalDateTime.now().plusDays(2));
    //     vt.setUsed(false);
    //     tokenRepository.save(vt);

    //     return vt.getToken();
    // }
}