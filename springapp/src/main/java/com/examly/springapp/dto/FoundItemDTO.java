package com.examly.springapp.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class FoundItemDTO {
    
    private Long id;
    
    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Item name must not exceed 100 characters")
    private String itemName;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotNull(message = "Category is required")
    private Long categoryId;
    
    private String categoryName;
    
    @NotBlank(message = "Found location is required")
    @Size(max = 200, message = "Found location must not exceed 200 characters")
    private String foundLocation;
    
    @NotNull(message = "Found date is required")
    @PastOrPresent(message = "Found date cannot be in the future")
    private LocalDate foundDate;
    
    private String photoUrl;
    
    @NotBlank(message = "Finder email is required")
    @Email(message = "Invalid email format")
    private String finderEmail;
    
    @NotBlank(message = "Finder name is required")
    @Size(max = 100, message = "Finder name must not exceed 100 characters")
    private String finderName;
    
    private String status;
    
    // Constructors
    public FoundItemDTO() {}
    
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
    
    public String getFoundLocation() { return foundLocation; }
    public void setFoundLocation(String foundLocation) { this.foundLocation = foundLocation; }
    
    public LocalDate getFoundDate() { return foundDate; }
    public void setFoundDate(LocalDate foundDate) { this.foundDate = foundDate; }
    
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    
    public String getFinderEmail() { return finderEmail; }
    public void setFinderEmail(String finderEmail) { this.finderEmail = finderEmail; }
    
    public String getFinderName() { return finderName; }
    public void setFinderName(String finderName) { this.finderName = finderName; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}