package com.example.demo.api.auth.user;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public interface CustomUserService extends UserDetailsService {

    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
