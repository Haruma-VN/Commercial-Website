package com.haruma.library.service;

import com.haruma.library.dto.response.OrderResponse;
import com.haruma.library.entity.Order;
import com.haruma.library.entity.Status;
import org.springframework.data.domain.Page;

public interface OrderService {

    Order addOrder(String userEmail, Order order, Long bookId);

    Order deleteOrderById(Long orderId);

    Order updateOrder(Order order);

    Order updateOrderStatus(Long orderId, Status status);

    Page<OrderResponse> getAllOrderByUserId(Long id, Integer limit, Integer page);

    Page<Order> getAllByStatusId(Integer id, Integer limit, Integer page);

    Page<Order> getAllByAddressId(Long id, Integer limit, Integer page);

    Page<Order> getAllOrder(Integer limit, Integer page);
}
