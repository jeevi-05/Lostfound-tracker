package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {
    
    private final String UPLOAD_DIR = "uploads/";
    
    @PostMapping("/photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(@RequestParam(value = "file", required = false) MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        
        if (file == null || file.isEmpty()) {
            response.put("error", "Please select a file to upload");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        
        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            
            // Save file
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath);
            
            // Return file URL
            String fileUrl = "/uploads/" + uniqueFilename;
            response.put("url", fileUrl);
            response.put("message", "File uploaded successfully");
            
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        } catch (IOException e) {
            response.put("error", "Failed to upload file: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}