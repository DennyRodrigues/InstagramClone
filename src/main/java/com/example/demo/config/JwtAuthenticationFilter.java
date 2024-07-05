package com.example.demo.config;

import com.example.demo.api.user.CustomUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CustomUserService userDetailsService;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private static final String[] WHITE_LIST_URL = SecurityProperties.WHITE_LIST_URL;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String requestPath = request.getRequestURI();
        for (String whiteListed : WHITE_LIST_URL) {
            if (pathMatcher.match(whiteListed, requestPath)) {
                filterChain.doFilter(request, response);
                return;
            }
        }


        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        final String userId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        //  Get the token substring by Skipping the word BEARER
        jwt = authHeader.substring(7);

        username = jwtService.extractUsername(jwt);
        userId = jwtService.extractUserId(jwt);
        if (username != null && SecurityContextHolder.getContext()
                                                     .getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                                                                                                        null,
                                                                                                        userDetails.getAuthorities());
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext()
                                     .setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);

    }
}
