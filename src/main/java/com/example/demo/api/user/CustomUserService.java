package com.example.demo.api.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface CustomUserService extends UserDetailsService {

    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
