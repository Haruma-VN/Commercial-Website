package com.haruma.library.service.impl;

import com.haruma.library.dto.response.*;
import com.haruma.library.entity.Order;
import com.haruma.library.entity.Status;
import com.haruma.library.repository.*;
import com.haruma.library.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OrderServiceImplement implements OrderService {

    private final OrderRepository orderRepository;

    private final StatusRepository statusRepository;

    private final UserRepository userRepository;

    private final AddressRepository addressRepository;

    private final BookRepository bookRepository;


    @Autowired
    public OrderServiceImplement(OrderRepository orderRepository, StatusRepository statusRepository,
                                 UserRepository userRepository, AddressRepository addressRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.statusRepository = statusRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public Order addOrder(String userEmail, Order order, Long bookId) {
        var status = this.statusRepository.findByStatusId(1);
        if (status.isEmpty()) {
            throw new RuntimeException("Không tìm thấy trạng thái");
        }
        var book = this.bookRepository.findById(bookId);
        if (book.isEmpty()) {
            throw new RuntimeException("Không tìm thấy sách");
        }
        var user = this.userRepository.findUserByEmail(userEmail);
        if (user.isEmpty()) {
            throw new RuntimeException("Không tìm thấy người dùng");
        }
        var newQuantity = book.get().getQuantity() - order.getQuantity();
        if (newQuantity < 0) {
            throw new RuntimeException("Hết hàng, không thể bán");
        }
        order.setStatus(status.get());
        order.setUser(user.get());
        var oldAddress = order.getAddress();
        oldAddress.setUser(user.get());
        var address = this.addressRepository.save(oldAddress);
        order.setAddress(address);
        order.setOrderDate(new Date());
        order.setBook(book.get());
        book.get().setQuantity(newQuantity);
        order.setTotalPrice(book.get().getPrice().multiply(new BigDecimal(order.getQuantity())));
        return this.orderRepository.save(order);
    }

    @Override
    public Order deleteOrderById(Long orderId) {
        var order = this.orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new RuntimeException("Không có đơn hàng để xóa");
        }
        order.get().getBook().setQuantity(order.get().getBook().getQuantity() + order.get().getQuantity());
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
    public Page<OrderResponse> getAllOrderByUserId(Long id, Integer page, Integer limit) {
        var pageable = PageRequest.of(page, limit);
        var result = this.orderRepository.findByUserId(id, pageable);
        return result.map(objects -> {
            var book = new BookFastResponse(
                    objects.getBook().getId(),
                    objects.getBook().getTitle(),
                    objects.getBook().getPrice()
            );
            var status = new StatusResponse(
                    objects.getStatus().getStatusId(),
                    objects.getStatus().getStatusName()
            );
            return new OrderResponse(
                    objects.getOrderId(),
                    objects.getOrderDate(),
                    objects.getQuantity(),
                    book,
                    status
            );
        });
    }

    @Override
    public Page<Order> getAllByStatusId(Integer id, Integer page, Integer limit) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findByStatusId(id, pageable);
    }

    @Override
    public Page<Order> getAllByAddressId(Long id, Integer page, Integer limit) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findByAddressId(id, pageable);
    }

    @Override
    public Page<Order> getAllOrder(Integer page, Integer limit) {
        var pageable = PageRequest.of(page, limit);
        return this.orderRepository.findAll(pageable);
    }

    @Override
    public List<OrderStatusStatistic> getOrdersByStatus() {
        var results = orderRepository.countOrdersByStatus();
        var destination = new ArrayList<OrderStatusStatistic>();
        for (var result : results) {
            String statusName = (String) result[0];
            Long count = (Long) result[1];
            destination.add(OrderStatusStatistic.builder().statusName(statusName)
                    .orderCount(count).build());
        }
        return destination;
    }

    @Override
    public List<RevenueByDate> getRevenueByDate() {
        var results = orderRepository.calculateRevenueByDate();
        var destination = new ArrayList<RevenueByDate>();
        for (Object[] result : results) {
            Date orderDate = (Date) result[0];
            BigDecimal totalPrice = (BigDecimal) result[1];
            destination.add(new RevenueByDate(orderDate, totalPrice));
        }
        return destination;
    }


}
