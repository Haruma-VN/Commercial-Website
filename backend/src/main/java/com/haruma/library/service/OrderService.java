package com.haruma.library.service;

import com.haruma.library.dto.request.StatisticsRequest;
import com.haruma.library.dto.response.OrderResponse;
import com.haruma.library.dto.response.OrderStatusStatistic;
import com.haruma.library.dto.response.RevenueByDate;
import com.haruma.library.dto.response.StatisticsResponse;
import com.haruma.library.entity.Order;
import com.haruma.library.entity.Status;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {

    Order addOrder(String userEmail, Order order, Long bookId);

    Order deleteOrderById(Long orderId);

    Order updateOrder(Order order);

    Order updateOrderStatus(Long orderId, Status status);

    Page<OrderResponse> getAllOrderByUserId(Long id, Integer limit, Integer page);

    Page<Order> getAllByStatusId(Integer id, Integer limit, Integer page);

    Page<Order> getAllByAddressId(Long id, Integer limit, Integer page);

    Page<Order> getAllOrder(Integer limit, Integer page);

    List<OrderStatusStatistic> getOrdersByStatus();

    List<RevenueByDate> getRevenueByDate();

    List<StatisticsResponse> getStatistics(StatisticsRequest request);
}
