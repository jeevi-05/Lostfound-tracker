package com.examly.springapp.repository;

import com.examly.springapp.entity.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    
    List<LostItem> findByReporterEmail(String reporterEmail);
    
    List<LostItem> findByStatus(LostItem.ItemStatus status);
    
    List<LostItem> findByCategoryId(Long categoryId);
    
    @Query("SELECT l FROM LostItem l WHERE l.itemName LIKE %:keyword% OR l.description LIKE %:keyword%")
    List<LostItem> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT l FROM LostItem l WHERE l.lostDate BETWEEN :startDate AND :endDate")
    List<LostItem> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT l FROM LostItem l WHERE l.lostLocation LIKE %:location%")
    List<LostItem> findByLocation(@Param("location") String location);
}