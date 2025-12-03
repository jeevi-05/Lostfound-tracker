package com.examly.springapp.service;

import com.examly.springapp.entity.Category;
import com.examly.springapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeCategories();
    }
    
    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            // Create default categories
            categoryRepository.save(new Category("Electronics", "Mobile phones, laptops, tablets, etc."));
            categoryRepository.save(new Category("Books", "Textbooks, notebooks, study materials"));
            categoryRepository.save(new Category("Clothing", "Jackets, bags, shoes, accessories"));
            categoryRepository.save(new Category("Documents", "ID cards, certificates, important papers"));
            categoryRepository.save(new Category("Sports Equipment", "Sports gear, gym equipment"));
            categoryRepository.save(new Category("Jewelry", "Watches, rings, necklaces"));
            categoryRepository.save(new Category("Keys", "House keys, car keys, keychains"));
            categoryRepository.save(new Category("Other", "Items that don't fit other categories"));
        }
    }
}