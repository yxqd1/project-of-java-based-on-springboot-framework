package com.kob.backend.consumer.utils;

// 特别封装的工具类，方便调试

import com.kob.backend.utils.JwtUtil;
import io.jsonwebtoken.Claims;

public class JwtAuthentication {
    public static Integer getUserId(String token) {
        int userId = -1;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = Integer.parseInt(claims.getSubject());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return userId;

    }
}
