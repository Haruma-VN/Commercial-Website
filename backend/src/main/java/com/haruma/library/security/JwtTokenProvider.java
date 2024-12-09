package com.haruma.library.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private String jwtSecret = "652a0929b16344ce530df4882b67d03c193e09e8317ed780fbefe51dbf47cdbd";

    private long jwtExpirationDate = 604800000;

    public String generateToken(UserDetails userDetails){
        var username = userDetails.getUsername();
        var currentDate = new Date();
        var expireDate = new Date(currentDate.getTime() + jwtExpirationDate*24);
        var token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key())
                .compact();
        return token;
    }

    private SecretKey key(){
        Assert.notNull(jwtSecret, "Khóa không được null");
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String extractUsername (String token){
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    public boolean validateToken(String token){
        try {
            Jwts.parser().verifyWith(key())
                    .build()
                    .parse(token);
            return true;
        }catch (Exception e){
            throw new RuntimeException("Token không hợp lệ");
        }
    }

}
