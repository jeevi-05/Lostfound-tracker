package com.examly.springapp.repository;

import com.examly.springapp.entity.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {
    
    List<FoundItem> findByFinderEmailOrderByCreatedAtDesc(String finderEmail);
    
    @Query("SELECT f FROM FoundItem f WHERE " +
           "LOWER(f.itemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.foundLocation) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<FoundItem> searchByKeyword(@Param("keyword") String keyword);
    
    List<FoundItem> findAllByOrderByCreatedAtDesc();
    
    List<FoundItem> findByCategoryId(Long categoryId);
    
    List<FoundItem> findByStatus(String status);
    
    List<FoundItem> findByCategoryIdAndStatus(Long categoryId, String status);
    
    List<FoundItem> findByCategoryIdAndFinderEmail(Long categoryId, String finderEmail);
    
    List<FoundItem> findByStatusAndFinderEmail(String status, String finderEmail);
    
    List<FoundItem> findByCategoryIdAndStatusAndFinderEmail(Long categoryId, String status, String finderEmail);
}