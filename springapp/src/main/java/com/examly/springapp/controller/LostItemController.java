package com.examly.springapp.controller;

import com.examly.springapp.dto.LostItemDTO;
import com.examly.springapp.dto.CreateLostItemDTO;
import com.examly.springapp.service.LostItemService;
import com.examly.springapp.service.UserService;
import com.examly.springapp.entity.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lost-items")
@CrossOrigin(origins = "http://localhost:3000")
public class LostItemController {
    
    @Autowired
    private LostItemService lostItemService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createLostItem(@Valid @RequestBody LostItemDTO lostItemDTO) {
        try {
            System.out.println("Received lost item: " + lostItemDTO.getItemName());
            System.out.println("Category ID: " + lostItemDTO.getCategoryId());
            System.out.println("Lost Date: " + lostItemDTO.getLostDate());
            
            LostItemDTO createdItem = lostItemService.createLostItem(lostItemDTO);
            return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating lost item: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<LostItemDTO>> getAllLostItems() {
        List<LostItemDTO> lostItems = lostItemService.getAllLostItems();
        return new ResponseEntity<>(lostItems, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LostItemDTO> getLostItemById(@PathVariable Long id) {
        return lostItemService.getLostItemById(id)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<List<LostItemDTO>> getLostItemsByUser(@PathVariable String email) {
        List<LostItemDTO> userItems = lostItemService.getLostItemsByUser(email);
        return new ResponseEntity<>(userItems, HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<LostItemDTO>> searchLostItems(@RequestParam String keyword) {
        List<LostItemDTO> searchResults = lostItemService.searchLostItems(keyword);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LostItemDTO> updateLostItem(@PathVariable Long id, 
                                                     @Valid @RequestBody CreateLostItemDTO updateDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            User user = userService.findByEmail(email);
            
            LostItemDTO lostItemDTO = new LostItemDTO();
            lostItemDTO.setItemName(updateDTO.getItemName());
            lostItemDTO.setDescription(updateDTO.getDescription());
            lostItemDTO.setCategoryId(updateDTO.getCategoryId());
            lostItemDTO.setLostLocation(updateDTO.getLostLocation());
            lostItemDTO.setLostDate(updateDTO.getLostDate());
            lostItemDTO.setPhotoUrl(updateDTO.getPhotoUrl());
            lostItemDTO.setReporterEmail(user.getEmail());
            lostItemDTO.setReporterName(user.getName());
            
            LostItemDTO updatedItem = lostItemService.updateLostItem(id, lostItemDTO);
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLostItem(@PathVariable Long id) {
        try {
            lostItemService.deleteLostItem(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}