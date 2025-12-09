package com.examly.springapp.controller;

import com.examly.springapp.dto.FoundItemDTO;
import com.examly.springapp.dto.LostItemDTO;
import com.examly.springapp.entity.LostItem;
import com.examly.springapp.service.AdminPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/posts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPostController {

    @Autowired
    private AdminPostService adminPostService;

    @GetMapping("/lost")
    public ResponseEntity<List<LostItemDTO>> getAllLostItems(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String userEmail) {
        return ResponseEntity.ok(adminPostService.getLostItems(categoryId, status, userEmail));
    }

    @GetMapping("/found")
    public ResponseEntity<List<FoundItemDTO>> getAllFoundItems(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String userEmail) {
        return ResponseEntity.ok(adminPostService.getFoundItems(categoryId, status, userEmail));
    }

    @PatchMapping("/lost/{id}/status")
    public ResponseEntity<LostItemDTO> updateLostItemStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(adminPostService.updateLostItemStatus(id, request.get("status")));
    }

    @PatchMapping("/found/{id}/status")
    public ResponseEntity<FoundItemDTO> updateFoundItemStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(adminPostService.updateFoundItemStatus(id, request.get("status")));
    }

    @DeleteMapping("/lost/{id}")
    public ResponseEntity<Void> deleteLostItem(@PathVariable Long id) {
        adminPostService.deleteLostItem(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/found/{id}")
    public ResponseEntity<Void> deleteFoundItem(@PathVariable Long id) {
        adminPostService.deleteFoundItem(id);
        return ResponseEntity.noContent().build();
    }
}
