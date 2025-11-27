package com.example.TripTacTix.service;

import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HexFormat;

@Service
public class PasswordService {

    private final HexFormat hexFormat = HexFormat.of();

    public String generateSalt() {
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        return hexFormat.formatHex(salt);
    }

    public String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(hexFormat.parseHex(salt));
            byte[] digest = md.digest(password.getBytes("UTF-8"));
            return hexFormat.formatHex(digest);
        } catch (Exception e) {
            throw new RuntimeException("Password hashing failed", e);
        }
    }

    public boolean verifyPassword(String password, String salt, String hashedPassword) {
        return hashPassword(password, salt).equals(hashedPassword);
    }
}