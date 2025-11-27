package com.example.TripTacTix.controller;

import com.example.TripTacTix.model.User;
import com.example.TripTacTix.repository.UserRepository;
import com.example.TripTacTix.security.JwtUtil;
import com.example.TripTacTix.service.PasswordService;  // Fixed: removed extra space
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.*;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(
        origins = {
            // "https://trip-tactix-two.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174"
        },
        allowCredentials = "true"
)
public class UserController {

    private final UserRepository userRepo;
    private final PasswordService passwordService;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepo, PasswordService passwordService, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String fullName = body.get("fullName");
        String email = body.get("email");
        String password = body.get("password");

        if (fullName == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "fullName, email and password are required"));
        }

        if (userRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "Email already exists"));
        }

        String salt = passwordService.generateSalt();
        String hashed = passwordService.hashPassword(password, salt);

        User u = new User();
        u.setFullName(fullName);
        u.setEmail(email);
        u.setSalt(salt);
        u.setPassword(hashed);

        User saved = userRepo.save(u);
        saved.setPassword(null); // hide password
        saved.setSalt(null); // hide salt too
        return ResponseEntity.status(201).body(Map.of("message", "User created", "user", saved));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletResponse res) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        var maybeUser = userRepo.findByEmail(email);
        if (maybeUser.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        User user = maybeUser.get();
        String hashed = passwordService.hashPassword(password, user.getSalt());
        if (!hashed.equals(user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(user.getId(), user.getFullName(), user.getEmail());

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // true for HTTPS in production
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 1 day
        cookie.setAttribute("SameSite", "None");
        res.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Login successful"));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(HttpServletRequest req) {
        Claims claims = (Claims) req.getAttribute("user");
        if (claims == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String userId = claims.get("_id", String.class);
        var maybeUser = userRepo.findById(userId);
        if (maybeUser.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        User u = maybeUser.get();
        u.setPassword(null);
        u.setSalt(null);
        return ResponseEntity.ok(Map.of("user", u));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse res) {
        Cookie cookie = new Cookie("token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "None");
        res.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }
}