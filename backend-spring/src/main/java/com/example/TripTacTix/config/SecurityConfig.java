package com.example.TripTacTix.config;

import com.example.TripTacTix.security.AuthFilter;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthFilter authFilter;

    public SecurityConfig(AuthFilter authFilter) {
        this.authFilter = authFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configure(http))  // Enable CORS with default config
            .csrf(csrf -> csrf.disable())  // Disable CSRF for stateless JWT
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // No sessions
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/user/**", "/health", "/error").permitAll()  // Public endpoints
                .anyRequest().authenticated()  // All other requests need authentication
            )
            .httpBasic(httpBasic -> httpBasic.disable())  // Disable HTTP Basic
            .formLogin(formLogin -> formLogin.disable())  // Disable form login
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter

        return http.build();
    }

    // Optional: Prevent AuthFilter from being registered twice
    @Bean
    public FilterRegistrationBean<AuthFilter> authFilterRegistration(AuthFilter filter) {
        FilterRegistrationBean<AuthFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);  // Disable default registration
        return registration;
    }
}