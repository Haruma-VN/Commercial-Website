package com.haruma.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.haruma.library.entity.Address;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
