package com.example.expensetracker.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(0) // Highest priority — runs before Spring Security
public class CorsConfig implements Filter {

    private static final String FRONTEND_URL = "https://personal-expense-tracker-api-frontend.onrender.com/add";

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // Set CORS headers (same as your Node.js example)
        response.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
        response.setHeader("Vary", "Origin");
        response.setHeader("Access-Control-Allow-Methods",
                "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
        response.setHeader("Access-Control-Allow-Headers",
                "Authorization,Content-Type,Accept,X-Requested-With,Origin,Access-Control-Request-Method,Access-Control-Request-Headers");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Private-Network", "true");
        response.setHeader("Access-Control-Max-Age", "7200");

        // Handle preflight OPTIONS request directly (no downstream processing)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return;
        }

        // Continue normal filter chain for other requests
        chain.doFilter(req, res);
    }
}
