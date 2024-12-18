package com.haruma.library.controller;

import com.haruma.library.dto.request.StatisticsRequest;
import com.haruma.library.dto.response.OrderStatusStatistic;
import com.haruma.library.dto.response.RevenueByDate;
import com.haruma.library.dto.response.StatisticsResponse;
import com.haruma.library.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/statistics")
@Tag(name="Statistics", description = "Statistics API")
public class StatisticsController {

    private final OrderService orderService;

    @Autowired
    public StatisticsController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders-by-status")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Get order by status")
    public ResponseEntity<List<OrderStatusStatistic>> getOrdersByStatus() {
        var statistics = orderService.getOrdersByStatus();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/revenue-by-date")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Get revenue by date")
    public ResponseEntity<List<RevenueByDate>> getRevenueByDate() {
        var statistics = orderService.getRevenueByDate();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Get statistics by date")
    public ResponseEntity<List<StatisticsResponse>> getStatistics(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        var statistics = orderService.getStatistics(StatisticsRequest.builder().startDate(startTime).endDate(endTime).build());
        return ResponseEntity.ok(statistics);
    }

}