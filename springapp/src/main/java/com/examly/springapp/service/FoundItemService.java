package com.examly.springapp.service;

import com.examly.springapp.dto.FoundItemDTO;
import com.examly.springapp.entity.Category;
import com.examly.springapp.entity.FoundItem;
import com.examly.springapp.repository.CategoryRepository;
import com.examly.springapp.repository.FoundItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoundItemService {
    
    @Autowired
    private FoundItemRepository foundItemRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public FoundItemDTO createFoundItem(FoundItemDTO foundItemDTO) {
        FoundItem foundItem = convertToEntity(foundItemDTO);
        FoundItem savedItem = foundItemRepository.save(foundItem);
        return convertToDTO(savedItem);
    }
    
    public List<FoundItemDTO> getAllFoundItems() {
        return foundItemRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<FoundItemDTO> getFoundItemById(Long id) {
        return foundItemRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<FoundItemDTO> getFoundItemsByUser(String email) {
        return foundItemRepository.findByFinderEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FoundItemDTO> searchFoundItems(String keyword) {
        return foundItemRepository.searchByKeyword(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public FoundItemDTO updateFoundItem(Long id, FoundItemDTO foundItemDTO) {
        FoundItem existingItem = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));
        
        existingItem.setItemName(foundItemDTO.getItemName());
        existingItem.setDescription(foundItemDTO.getDescription());
        existingItem.setFoundLocation(foundItemDTO.getFoundLocation());
        existingItem.setFoundDate(foundItemDTO.getFoundDate());
        existingItem.setPhotoUrl(foundItemDTO.getPhotoUrl());
        existingItem.setFinderName(foundItemDTO.getFinderName());
        existingItem.setFinderEmail(foundItemDTO.getFinderEmail());
        
        Category category = categoryRepository.findById(foundItemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        existingItem.setCategory(category);
        
        FoundItem updatedItem = foundItemRepository.save(existingItem);
        return convertToDTO(updatedItem);
    }
    
    public void deleteFoundItem(Long id) {
        foundItemRepository.deleteById(id);
    }
    
    private FoundItem convertToEntity(FoundItemDTO dto) {
        FoundItem foundItem = new FoundItem();
        foundItem.setId(dto.getId());
        foundItem.setItemName(dto.getItemName());
        foundItem.setDescription(dto.getDescription());
        foundItem.setFoundLocation(dto.getFoundLocation());
        foundItem.setFoundDate(dto.getFoundDate());
        foundItem.setPhotoUrl(dto.getPhotoUrl());
        foundItem.setFinderName(dto.getFinderName());
        foundItem.setFinderEmail(dto.getFinderEmail());
        foundItem.setStatus(dto.getStatus() != null ? dto.getStatus() : "AVAILABLE");
        
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        foundItem.setCategory(category);
        
        return foundItem;
    }
    
    private FoundItemDTO convertToDTO(FoundItem foundItem) {
        FoundItemDTO dto = new FoundItemDTO();
        dto.setId(foundItem.getId());
        dto.setItemName(foundItem.getItemName());
        dto.setDescription(foundItem.getDescription());
        dto.setCategoryId(foundItem.getCategory().getId());
        dto.setCategoryName(foundItem.getCategory().getName());
        dto.setFoundLocation(foundItem.getFoundLocation());
        dto.setFoundDate(foundItem.getFoundDate());
        dto.setPhotoUrl(foundItem.getPhotoUrl());
        dto.setFinderName(foundItem.getFinderName());
        dto.setFinderEmail(foundItem.getFinderEmail());
        dto.setStatus(foundItem.getStatus());
        return dto;
    }
}