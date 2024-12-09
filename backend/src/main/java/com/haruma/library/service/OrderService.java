package com.haruma.library.service;

import com.haruma.library.entity.Order;
import com.haruma.library.entity.Status;
import org.springframework.data.domain.Page;

public interface OrderService {
    Order addOrder(Order order);

    Order deleteOrderById(Long orderId);

    Order updateOrder(Order order);

    Order updateOrderStatus(Long orderId, Status status);

    Page<Order> getAllOrderByUserId(Long id, Integer limit, Integer page);

    Page<Order> getAllByStatusId(Integer id, Integer limit, Integer page);

    Page<Order> getAllByAddressId(Long id, Integer limit, Integer page);

    Page<Order> getAllOrder(Integer limit, Integer page);
}
