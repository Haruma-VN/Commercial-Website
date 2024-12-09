package com.haruma.library.controller;

import com.haruma.library.entity.Order;
import com.haruma.library.service.OrderService;
import com.haruma.library.service.StatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
@Tag(name="Order", description = "Order API")
public class OrderController {

    private final OrderService orderService;

    private final StatusService statusService;

    @Autowired
    public OrderController(OrderService orderService, StatusService statusService) {
        this.orderService = orderService;
        this.statusService = statusService;
    }

    @PostMapping("/order")
    @Operation(summary = "Add a new order")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        var newOrder = orderService.addOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/order")
    @Operation(summary = "Update an existing order")
    public ResponseEntity<?> updateOrder(@RequestBody Order order)  {
        var newOrder = orderService.updateOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/order/cancel")
    @Operation(summary = "Cancel an existing order")
    public ResponseEntity<?> cancelOrder(@RequestParam("orderId") Long orderId)  {
        var newOrder = orderService.updateOrderStatus(orderId, this.statusService.getStatusById(3));
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/order/approve")
    @Operation(summary = "Approve an existing order")
    public ResponseEntity<?> approveOrder(@RequestParam("orderId") Long orderId)  {
        var newOrder = orderService.updateOrderStatus(orderId, this.statusService.getStatusById(2));
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @DeleteMapping("/order/{orderId}")
    @Operation(summary = "Delete an existing order")
    public ResponseEntity<?> deleteOrder(@PathVariable("orderId") Long orderId) {
        return new ResponseEntity<>(orderService.deleteOrderById(orderId), HttpStatus.OK);
    }

    @GetMapping("/order")
    @Operation(summary = "Get all order")
    public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllOrder(page, limit), HttpStatus.OK);
    }

    @GetMapping("/order/status")
    @Operation(summary = "Get all order by status")
    public ResponseEntity<?> getOrderByStatus(@RequestParam() Integer statusId,
                                         @RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllByStatusId(statusId, page, limit), HttpStatus.OK);
    }

    @GetMapping("/order/address")
    @Operation(summary = "Get all order by address")
    public ResponseEntity<?> getOrderByAddress(@RequestParam() Long addressId,
                                              @RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(orderService.getAllByAddressId(addressId, page, limit), HttpStatus.OK);
    }

}
