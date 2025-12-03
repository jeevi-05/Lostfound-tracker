package com.examly.springapp.service;

import com.examly.springapp.dto.LostItemDTO;
import com.examly.springapp.entity.Category;
import com.examly.springapp.entity.LostItem;
import com.examly.springapp.repository.CategoryRepository;
import com.examly.springapp.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LostItemService {
    
    @Autowired
    private LostItemRepository lostItemRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public LostItemDTO createLostItem(LostItemDTO lostItemDTO) {
        Category category = categoryRepository.findById(lostItemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        LostItem lostItem = new LostItem();
        lostItem.setItemName(lostItemDTO.getItemName());
        lostItem.setDescription(lostItemDTO.getDescription());
        lostItem.setCategory(category);
        lostItem.setLostLocation(lostItemDTO.getLostLocation());
        lostItem.setLostDate(lostItemDTO.getLostDate());
        lostItem.setPhotoUrl(lostItemDTO.getPhotoUrl());
        lostItem.setReporterEmail(lostItemDTO.getReporterEmail());
        lostItem.setReporterName(lostItemDTO.getReporterName());
        
        LostItem savedItem = lostItemRepository.save(lostItem);
        return convertToDTO(savedItem);
    }
    
    public List<LostItemDTO> getAllLostItems() {
        return lostItemRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<LostItemDTO> getLostItemById(Long id) {
        return lostItemRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<LostItemDTO> getLostItemsByUser(String email) {
        return lostItemRepository.findByReporterEmail(email).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<LostItemDTO> searchLostItems(String keyword) {
        return lostItemRepository.findByKeyword(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public LostItemDTO updateLostItem(Long id, LostItemDTO lostItemDTO) {
        LostItem existingItem = lostItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));
        
        Category category = categoryRepository.findById(lostItemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        existingItem.setItemName(lostItemDTO.getItemName());
        existingItem.setDescription(lostItemDTO.getDescription());
        existingItem.setCategory(category);
        existingItem.setLostLocation(lostItemDTO.getLostLocation());
        existingItem.setLostDate(lostItemDTO.getLostDate());
        existingItem.setPhotoUrl(lostItemDTO.getPhotoUrl());
        
        LostItem updatedItem = lostItemRepository.save(existingItem);
        return convertToDTO(updatedItem);
    }
    
    public void deleteLostItem(Long id) {
        if (!lostItemRepository.existsById(id)) {
            throw new RuntimeException("Lost item not found");
        }
        lostItemRepository.deleteById(id);
    }
    
    private LostItemDTO convertToDTO(LostItem lostItem) {
        LostItemDTO dto = new LostItemDTO();
        dto.setId(lostItem.getId());
        dto.setItemName(lostItem.getItemName());
        dto.setDescription(lostItem.getDescription());
        dto.setCategoryId(lostItem.getCategory().getId());
        dto.setCategoryName(lostItem.getCategory().getName());
        dto.setLostLocation(lostItem.getLostLocation());
        dto.setLostDate(lostItem.getLostDate());
        dto.setPhotoUrl(lostItem.getPhotoUrl());
        dto.setReporterEmail(lostItem.getReporterEmail());
        dto.setReporterName(lostItem.getReporterName());
        dto.setStatus(lostItem.getStatus().toString());
        return dto;
    }
}