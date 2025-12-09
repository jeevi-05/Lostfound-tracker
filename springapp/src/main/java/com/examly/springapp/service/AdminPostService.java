package com.examly.springapp.service;

import com.examly.springapp.dto.FoundItemDTO;
import com.examly.springapp.dto.LostItemDTO;
import com.examly.springapp.entity.FoundItem;
import com.examly.springapp.entity.LostItem;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.FoundItemRepository;
import com.examly.springapp.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminPostService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    public List<LostItemDTO> getLostItems(Long categoryId, String status, String userEmail) {
        List<LostItem> items;
        
        if (categoryId != null && status != null && userEmail != null) {
            items = lostItemRepository.findByCategoryIdAndStatusAndReporterEmail(
                categoryId, LostItem.ItemStatus.valueOf(status.toUpperCase()), userEmail);
        } else if (categoryId != null && status != null) {
            items = lostItemRepository.findByCategoryIdAndStatus(
                categoryId, LostItem.ItemStatus.valueOf(status.toUpperCase()));
        } else if (categoryId != null && userEmail != null) {
            items = lostItemRepository.findByCategoryIdAndReporterEmail(categoryId, userEmail);
        } else if (status != null && userEmail != null) {
            items = lostItemRepository.findByStatusAndReporterEmail(
                LostItem.ItemStatus.valueOf(status.toUpperCase()), userEmail);
        } else if (categoryId != null) {
            items = lostItemRepository.findByCategoryId(categoryId);
        } else if (status != null) {
            items = lostItemRepository.findByStatus(LostItem.ItemStatus.valueOf(status.toUpperCase()));
        } else if (userEmail != null) {
            items = lostItemRepository.findByReporterEmail(userEmail);
        } else {
            items = lostItemRepository.findAll();
        }
        
        return items.stream().map(this::convertToLostItemDTO).collect(Collectors.toList());
    }

    public List<FoundItemDTO> getFoundItems(Long categoryId, String status, String userEmail) {
        List<FoundItem> items;
        
        if (categoryId != null && status != null && userEmail != null) {
            items = foundItemRepository.findByCategoryIdAndStatusAndFinderEmail(categoryId, status, userEmail);
        } else if (categoryId != null && status != null) {
            items = foundItemRepository.findByCategoryIdAndStatus(categoryId, status);
        } else if (categoryId != null && userEmail != null) {
            items = foundItemRepository.findByCategoryIdAndFinderEmail(categoryId, userEmail);
        } else if (status != null && userEmail != null) {
            items = foundItemRepository.findByStatusAndFinderEmail(status, userEmail);
        } else if (categoryId != null) {
            items = foundItemRepository.findByCategoryId(categoryId);
        } else if (status != null) {
            items = foundItemRepository.findByStatus(status);
        } else if (userEmail != null) {
            items = foundItemRepository.findByFinderEmailOrderByCreatedAtDesc(userEmail);
        } else {
            items = foundItemRepository.findAllByOrderByCreatedAtDesc();
        }
        
        return items.stream().map(this::convertToFoundItemDTO).collect(Collectors.toList());
    }

    @Transactional
    public LostItemDTO updateLostItemStatus(Long id, String status) {
        LostItem item = lostItemRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Lost item not found"));
        item.setStatus(LostItem.ItemStatus.valueOf(status.toUpperCase()));
        return convertToLostItemDTO(lostItemRepository.save(item));
    }

    @Transactional
    public FoundItemDTO updateFoundItemStatus(Long id, String status) {
        FoundItem item = foundItemRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Found item not found"));
        item.setStatus(status.toUpperCase());
        return convertToFoundItemDTO(foundItemRepository.save(item));
    }

    @Transactional
    public void deleteLostItem(Long id) {
        if (!lostItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lost item not found");
        }
        lostItemRepository.deleteById(id);
    }

    @Transactional
    public void deleteFoundItem(Long id) {
        if (!foundItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Found item not found");
        }
        foundItemRepository.deleteById(id);
    }

    private LostItemDTO convertToLostItemDTO(LostItem item) {
        LostItemDTO dto = new LostItemDTO();
        dto.setId(item.getId());
        dto.setItemName(item.getItemName());
        dto.setDescription(item.getDescription());
        dto.setCategoryId(item.getCategory().getId());
        dto.setCategoryName(item.getCategory().getName());
        dto.setLostLocation(item.getLostLocation());
        dto.setLostDate(item.getLostDate());
        dto.setPhotoUrl(item.getPhotoUrl());
        dto.setReporterEmail(item.getReporterEmail());
        dto.setReporterName(item.getReporterName());
        dto.setStatus(item.getStatus().name());
        return dto;
    }

    private FoundItemDTO convertToFoundItemDTO(FoundItem item) {
        FoundItemDTO dto = new FoundItemDTO();
        dto.setId(item.getId());
        dto.setItemName(item.getItemName());
        dto.setDescription(item.getDescription());
        dto.setCategoryId(item.getCategory().getId());
        dto.setCategoryName(item.getCategory().getName());
        dto.setFoundLocation(item.getFoundLocation());
        dto.setFoundDate(item.getFoundDate());
        dto.setPhotoUrl(item.getPhotoUrl());
        dto.setFinderName(item.getFinderName());
        dto.setFinderEmail(item.getFinderEmail());
        dto.setStatus(item.getStatus());
        return dto;
    }
}
