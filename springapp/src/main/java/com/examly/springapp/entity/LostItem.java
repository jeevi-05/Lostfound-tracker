package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "lost_items")
public class LostItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String itemName;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(nullable = false)
    private String lostLocation;
    
    @Column(nullable = false)
    private LocalDate lostDate;
    
    private String photoUrl;
    
    @Column(nullable = false)
    private String reporterEmail;
    
    @Column(nullable = false)
    private String reporterName;
    
    @Enumerated(EnumType.STRING)
    private ItemStatus status = ItemStatus.LOST;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt;
    
    public enum ItemStatus {
        LOST, FOUND, CLAIMED
    }
    
    // Constructors
    public LostItem() {}
    
    public LostItem(String itemName, String description, Category category, 
                   String lostLocation, LocalDate lostDate, String reporterEmail, String reporterName) {
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.lostLocation = lostLocation;
        this.lostDate = lostDate;
        this.reporterEmail = reporterEmail;
        this.reporterName = reporterName;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public String getLostLocation() { return lostLocation; }
    public void setLostLocation(String lostLocation) { this.lostLocation = lostLocation; }
    
    public LocalDate getLostDate() { return lostDate; }
    public void setLostDate(LocalDate lostDate) { this.lostDate = lostDate; }
    
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    
    public String getReporterEmail() { return reporterEmail; }
    public void setReporterEmail(String reporterEmail) { this.reporterEmail = reporterEmail; }
    
    public String getReporterName() { return reporterName; }
    public void setReporterName(String reporterName) { this.reporterName = reporterName; }
    
    public ItemStatus getStatus() { return status; }
    public void setStatus(ItemStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}