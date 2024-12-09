package com.haruma.library.service.impl;

import com.haruma.library.dto.request.AddressRequest;
import com.haruma.library.entity.Address;
import com.haruma.library.repository.AddressRepository;
import com.haruma.library.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImplement implements AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImplement(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address addAddress(AddressRequest address) {
        return addressRepository.save(Address.builder().addressName(address.getAddressName()).build());
    }

    @Override
    public Page<Address> getAllAddresses(Integer page, Integer limit) {
        return addressRepository.findAll(PageRequest.of(page, limit));
    }

    @Override
    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    @Override
    public Address updateAddress(Address updatedAddress) {
        if (addressRepository.existsById(updatedAddress.getAddressId())) {
            return addressRepository.save(updatedAddress);
        } else {
            throw new IllegalArgumentException("Không tìm thấy địa chỉ ID " + updatedAddress.getAddressId());
        }
    }

    @Override
    public void deleteAddress(Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Không tìm thấy địa chỉ với id " + id);
        }
    }


}
