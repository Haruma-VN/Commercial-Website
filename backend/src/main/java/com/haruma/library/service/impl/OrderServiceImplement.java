package com.haruma.library.service.impl;

import com.haruma.library.entity.Order;
import com.haruma.library.entity.Status;
import com.haruma.library.repository.OrderRepository;
import com.haruma.library.repository.StatusRepository;
import com.haruma.library.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImplement implements OrderService {

    private final OrderRepository orderRepository;

    private final StatusRepository statusRepository;

    @Autowired
    public OrderServiceImplement(OrderRepository orderRepository, StatusRepository statusRepository) {
        this.orderRepository = orderRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    public Order addOrder(Order order) {
        order.setStatus(this.statusRepository.findById(1).orElseThrow(()->new RuntimeException("Không tìm thấy trạng thái")));
        return this.orderRepository.save(order);
    }

    @Override
    public Order deleteOrderById(Long orderId) {
        var order = this.orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new RuntimeException("Không có đơn hàng để xóa");
        }
        this.orderRepository.delete(order.get());
        return order.get();
    }

    @Override
    public Order updateOrder(Order order) {
        var currentOrder = this.orderRepository.findById(order.getOrderId());
        if (currentOrder.isEmpty()) {
            throw new RuntimeException("Đơn hàng không tìm thấy");
        }
        return this.orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(Long orderId, Status status) {
        var currentOrder = this.orderRepository.findById(orderId);
        if (currentOrder.isEmpty()) {
            throw new RuntimeException("Đơn hàng không tìm thấy");
        }
        currentOrder.get().setStatus(status);
        return this.orderRepository.save(currentOrder.get());
    }

    @Override
    public Page<Order> getAllOrderByUserId(Long id, Integer limit, Integer page) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findByUserId(id, pageable);
    }

    @Override
    public Page<Order> getAllByStatusId(Integer id, Integer limit, Integer page) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findByStatusId(id, pageable);
    }

    @Override
    public Page<Order> getAllByAddressId(Long id, Integer limit, Integer page) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findByAddressId(id, pageable);
    }

    @Override
    public Page<Order> getAllOrder(Integer limit, Integer page) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findAll(pageable);
    }

}
