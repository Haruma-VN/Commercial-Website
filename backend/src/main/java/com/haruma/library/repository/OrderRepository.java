package com.haruma.library.repository;

import com.haruma.library.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserId(Long id, Pageable pageable);

    @Query(value="select * from `order` where status_id=:statusId", nativeQuery = true)
    Page<Order> findByStatusId(@Param("statusId") Integer statusId, Pageable pageable);

    @Query(value="select * from `order` where address_id=:addressId", nativeQuery = true)
    Page<Order> findByAddressId(@Param("addressId") Long id, Pageable pageable);

}
