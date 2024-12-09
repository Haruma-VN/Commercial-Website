package com.haruma.library.controller;

import com.haruma.library.dto.request.AddressRequest;
import com.haruma.library.entity.Address;
import com.haruma.library.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/address")
@Tag(name="Address", description = "Address")
public class AddressController {

    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    @Operation(description = "Get all address")
    @PostAuthorize(value = "hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<Address>> getAddresses(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(this.addressService.getAllAddresses(page, limit), HttpStatus.OK);
    }

    @PostMapping
    @Operation(description = "Add an address")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addAddress(@RequestBody AddressRequest address) {
        return new ResponseEntity<>(this.addressService.addAddress(address), HttpStatus.OK);
    }

    @PutMapping
    @Operation(description = "Update an address")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAddress(@RequestBody Address address) {
        return new ResponseEntity<>(this.addressService.updateAddress(address), HttpStatus.OK);
    }

    @DeleteMapping("/{addressId}")
    @Operation(description = "Delete an address")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAddress(@PathVariable("addressId") Long addressId) {
        this.addressService.deleteAddress(addressId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
