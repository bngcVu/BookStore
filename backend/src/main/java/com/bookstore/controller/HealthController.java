package com.bookstore.controller;

import com.bookstore.api.response.ApiResponse;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("service", "BookStore");
        data.put("status", "UP");
        data.put("checkedAt", Instant.now());

        return ResponseEntity.ok(ApiResponse.success("Dịch vụ hoạt động bình thường", data));
    }
}
