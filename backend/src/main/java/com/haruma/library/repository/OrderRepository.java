package com.haruma.library.repository;

import com.haruma.library.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserId(Long id, Pageable pageable);

    @Query(value="select * from `order` where status_id=:statusId", nativeQuery = true)
    Page<Order> findByStatusId(@Param("statusId") Integer statusId, Pageable pageable);

    @Query(value="select * from `order` where address_id=:addressId", nativeQuery = true)
    Page<Order> findByAddressId(@Param("addressId") Long id, Pageable pageable);

    @Query(value = "SELECT status_name, COUNT(*) FROM `order` INNER JOIN `status` ON `order`.status_id = status.status_id GROUP BY status_name", nativeQuery = true)
    List<Object[]> countOrdersByStatus();

    @Query(value = "SELECT DATE(order_date), SUM(total_price) " +
            "FROM `order` " +
            "GROUP BY DATE(order_date) " +
            "ORDER BY DATE(order_date)", nativeQuery = true)
    List<Object[]> calculateRevenueByDate();

    @Query(value = "SELECT DATE(order_date) AS orderDate, " +
            "SUM(total_price) AS totalPrice, " +
            "SUM(quantity) AS totalQuantity " +
            "FROM `order` " +
            "WHERE order_date BETWEEN :startTime AND :endTime " +
            "GROUP BY DATE(order_date) " +
            "ORDER BY DATE(order_date)", nativeQuery = true)
    List<Object[]> getStatistics(@Param("startTime") String startTime, @Param("endTime") String endTime);



}
