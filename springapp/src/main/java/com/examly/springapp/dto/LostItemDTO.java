package com.examly.springapp.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class LostItemDTO {
    
    private Long id;
    
    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Item name must not exceed 100 characters")
    private String itemName;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotNull(message = "Category is required")
    private Long categoryId;
    
    private String categoryName;
    
    @NotBlank(message = "Lost location is required")
    @Size(max = 200, message = "Lost location must not exceed 200 characters")
    private String lostLocation;
    
    @NotNull(message = "Lost date is required")
    @PastOrPresent(message = "Lost date cannot be in the future")
    private LocalDate lostDate;
    
    private String photoUrl;
    
    @NotBlank(message = "Reporter email is required")
    @Email(message = "Invalid email format")
    private String reporterEmail;
    
    @NotBlank(message = "Reporter name is required")
    @Size(max = 100, message = "Reporter name must not exceed 100 characters")
    private String reporterName;
    
    private String status;
    
    // Constructors
    public LostItemDTO() {}
    
    public LostItemDTO(String itemName, String description, Long categoryId, 
                      String lostLocation, LocalDate lostDate, String reporterEmail, String reporterName) {
        this.itemName = itemName;
        this.description = description;
        this.categoryId = categoryId;
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
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
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
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}