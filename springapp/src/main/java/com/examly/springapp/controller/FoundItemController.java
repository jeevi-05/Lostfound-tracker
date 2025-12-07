package com.examly.springapp.controller;

import com.examly.springapp.dto.FoundItemDTO;
import com.examly.springapp.dto.CreateFoundItemDTO;
import com.examly.springapp.service.FoundItemService;
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
@RequestMapping("/api/found-items")
@CrossOrigin(origins = "http://localhost:3000")
public class FoundItemController {
    
    @Autowired
    private FoundItemService foundItemService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createFoundItem(@Valid @RequestBody FoundItemDTO foundItemDTO) {
        try {
            System.out.println("Received found item: " + foundItemDTO.getItemName());
            System.out.println("Category ID: " + foundItemDTO.getCategoryId());
            System.out.println("Found Date: " + foundItemDTO.getFoundDate());
            
            FoundItemDTO createdItem = foundItemService.createFoundItem(foundItemDTO);
            return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating found item: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<FoundItemDTO>> getAllFoundItems() {
        List<FoundItemDTO> foundItems = foundItemService.getAllFoundItems();
        return new ResponseEntity<>(foundItems, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FoundItemDTO> getFoundItemById(@PathVariable Long id) {
        return foundItemService.getFoundItemById(id)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<List<FoundItemDTO>> getFoundItemsByUser(@PathVariable String email) {
        List<FoundItemDTO> userItems = foundItemService.getFoundItemsByUser(email);
        return new ResponseEntity<>(userItems, HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FoundItemDTO>> searchFoundItems(@RequestParam String keyword) {
        List<FoundItemDTO> searchResults = foundItemService.searchFoundItems(keyword);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<FoundItemDTO> updateFoundItem(@PathVariable Long id, 
                                                       @Valid @RequestBody CreateFoundItemDTO updateDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            User user = userService.findByEmail(email);
            
            FoundItemDTO foundItemDTO = new FoundItemDTO();
            foundItemDTO.setItemName(updateDTO.getItemName());
            foundItemDTO.setDescription(updateDTO.getDescription());
            foundItemDTO.setCategoryId(updateDTO.getCategoryId());
            foundItemDTO.setFoundLocation(updateDTO.getFoundLocation());
            foundItemDTO.setFoundDate(updateDTO.getFoundDate());
            foundItemDTO.setPhotoUrl(updateDTO.getPhotoUrl());
            foundItemDTO.setFinderEmail(user.getEmail());
            foundItemDTO.setFinderName(user.getName());
            
            FoundItemDTO updatedItem = foundItemService.updateFoundItem(id, foundItemDTO);
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoundItem(@PathVariable Long id) {
        try {
            foundItemService.deleteFoundItem(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}