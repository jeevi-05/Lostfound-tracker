package com.examly.springapp.controller;

import com.examly.springapp.dto.*;
import com.examly.springapp.service.AuthServiceSimple;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthServiceSimple authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String token = authService.register(request);
        // token returned for dev; in prod you'd email it to the user.
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiMessageResponse("User registered. Verification token (dev): " + token)
        );
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam("token") String token) {
        String msg = authService.verifyAccount(token);
        return ResponseEntity.ok(new ApiMessageResponse(msg));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse resp = authService.login(request);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ex.printStackTrace(); // Debug: print full error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiMessageResponse("Login failed: " + ex.getMessage()));
        }
    }

    @GetMapping("/debug/{email}")
    public ResponseEntity<?> debugUser(@PathVariable String email) {
        try {
            String debug = authService.debugUser(email);
            return ResponseEntity.ok(new ApiMessageResponse(debug));
        } catch (Exception ex) {
            return ResponseEntity.ok(new ApiMessageResponse("Debug failed: " + ex.getMessage()));
        }
    }

    // @PostMapping("/create-admin")
    // public ResponseEntity<?> createAdmin(@Valid @RequestBody RegisterRequest request) {
    //     try {
    //         String token = authService.createAdmin(request);
    //         return ResponseEntity.status(HttpStatus.CREATED).body(
    //                 new ApiMessageResponse("Admin user created successfully. Token: " + token)
    //         );
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    //                 .body(new ApiMessageResponse("Failed to create admin: " + ex.getMessage()));
    //     }
    // }



    // small wrapper DTO for simple messages
    public static class ApiMessageResponse {
        private String message;
        public ApiMessageResponse() {}
        public ApiMessageResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
