package com.haruma.library.controller;

import com.haruma.library.dto.request.OrderRequest;
import com.haruma.library.entity.Address;
import com.haruma.library.entity.Order;
import com.haruma.library.service.OrderService;
import com.haruma.library.service.StatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/order")
@Tag(name="Order", description = "Order API")
public class OrderController {

    private final OrderService orderService;

    private final StatusService statusService;

    @Autowired
    public OrderController(OrderService orderService, StatusService statusService) {
        this.orderService = orderService;
        this.statusService = statusService;
    }

    @PostMapping("/{userEmail}")
    @Operation(summary = "Add a new order")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_USER')")
    public ResponseEntity<?> addOrder(@PathVariable("userEmail") String userEmail,
                                      @RequestBody OrderRequest order) {
        var newOrder = orderService.addOrder(userEmail, Order.builder()
                        .quantity(order.getQuantity())
                        .address(Address.builder().addressName(order.getAddress().getAddressName()).build())
                .build(), order.getBookId());
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping
    @Operation(summary = "Update an existing order")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateOrder(@RequestBody Order order)  {
        var newOrder = orderService.updateOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/cancel")
    @Operation(summary = "Cancel an existing order")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> cancelOrder(@RequestParam("orderId") Long orderId)  {
        var newOrder = orderService.updateOrderStatus(orderId, this.statusService.getStatusById(3));
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/approve")
    @Operation(summary = "Approve an existing order")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> approveOrder(@RequestParam("orderId") Long orderId)  {
        var newOrder = orderService.updateOrderStatus(orderId, this.statusService.getStatusById(2));
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    @Operation(summary = "Delete an existing order")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteOrder(@PathVariable("orderId") Long orderId) {
        return new ResponseEntity<>(orderService.deleteOrderById(orderId), HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "Get all order")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllOrder(page, limit), HttpStatus.OK);
    }

    @GetMapping("/user")
    @Operation(summary = "Get all order by user")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getOrderByUser(@RequestParam Long userId,
                                              @RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllOrderByUserId(userId, page, limit), HttpStatus.OK);
    }

    @GetMapping("/status")
    @Operation(summary = "Get all order by status")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getOrderByStatus(@RequestParam Integer statusId,
                                         @RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllByStatusId(statusId, page, limit), HttpStatus.OK);
    }

    @GetMapping("/address")
    @Operation(summary = "Get all order by address")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getOrderByAddress(@RequestParam() Long addressId,
                                              @RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllByAddressId(addressId, page, limit), HttpStatus.OK);
    }

}
