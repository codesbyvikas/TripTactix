package com.example.TripTacTix.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/plan")
@CrossOrigin(
    origins = {
        "https://trip-tactix-two.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174"
    },
    allowCredentials = "true"
)
public class PlannerController {

    @Value("${gemini.api.key}")
    private String geminiKey;

    @PostMapping("/generate-itinerary")
    public Object generateItinerary(@RequestBody Map<String, Object> body) {
        String prompt = Optional.ofNullable(body.get("prompt")).map(Object::toString).orElse("");

        Map<String, Object> req = Map.of(
                "contents", List.of(
                        Map.of(
                                "role", "user",
                                "parts", List.of(Map.of("text", prompt))
                        )
                )
        );

        RestTemplate rest = new RestTemplate();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + geminiKey;

        try {
            Map response = rest.postForObject(url, req, Map.class);
            return response;
        } catch (Exception ex) {
            return Map.of("error", "Gemini API error", "details", ex.getMessage());
        }
    }
}
