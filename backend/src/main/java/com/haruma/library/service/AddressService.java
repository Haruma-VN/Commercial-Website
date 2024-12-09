package com.haruma.library.service;

import com.haruma.library.dto.request.AddressRequest;
import com.haruma.library.entity.Address;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface AddressService {
    Address addAddress(AddressRequest address);

    Page<Address> getAllAddresses(Integer page, Integer limit);

    Optional<Address> getAddressById(Long id);

    Address updateAddress(Address updatedAddress);

    void deleteAddress(Long id);
}
