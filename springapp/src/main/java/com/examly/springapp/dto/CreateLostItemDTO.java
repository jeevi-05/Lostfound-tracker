package com.examly.springapp.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class CreateLostItemDTO {
    
    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Item name must not exceed 100 characters")
    private String itemName;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotNull(message = "Category is required")
    private Long categoryId;
    
    @NotBlank(message = "Lost location is required")
    @Size(max = 200, message = "Lost location must not exceed 200 characters")
    private String lostLocation;
    
    @NotNull(message = "Lost date is required")
    @PastOrPresent(message = "Lost date cannot be in the future")
    private LocalDate lostDate;
    
    private String photoUrl;
    
    // Constructors
    public CreateLostItemDTO() {}
    
    // Getters and Setters
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getLostLocation() { return lostLocation; }
    public void setLostLocation(String lostLocation) { this.lostLocation = lostLocation; }
    
    public LocalDate getLostDate() { return lostDate; }
    public void setLostDate(LocalDate lostDate) { this.lostDate = lostDate; }
    
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
}