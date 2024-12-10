package com.haruma.library.controller;

import com.haruma.library.dto.response.OrderStatusStatistic;
import com.haruma.library.dto.response.RevenueByDate;
import com.haruma.library.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/statistics")
public class StatisticsController {

    private final OrderService orderService;

    @Autowired
    public StatisticsController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders-by-status")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<OrderStatusStatistic>> getOrdersByStatus() {
        var statistics = orderService.getOrdersByStatus();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/revenue-by-date")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<RevenueByDate>> getRevenueByDate() {
        var statistics = orderService.getRevenueByDate();
        return ResponseEntity.ok(statistics);
    }

}