package com.examly.springapp.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class EmailDomainValidator {

    private final List<String> allowedDomains;

    public EmailDomainValidator(@Value("${app.allowed.domains:@university.edu}") String domainConfig) {
        if (domainConfig == null || domainConfig.isBlank()) {
            allowedDomains = Collections.singletonList("@university.edu");
        } else {
            String[] parts = domainConfig.split(",");
            List<String> list = new ArrayList<>();
            for (String p : parts) {
                list.add(p.trim().toLowerCase());
            }
            allowedDomains = Collections.unmodifiableList(list);
        }
    }

    public boolean isAllowedDomain(String email) {
        if (email == null) return false;
        String lower = email.toLowerCase();
        for (String d : allowedDomains) {
            if (lower.endsWith(d)) return true;
        }
        return false;
    }
}
