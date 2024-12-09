package com.haruma.library.service;

import com.haruma.library.entity.Status;

import java.util.List;

public interface StatusService {
    Status addStatus(Status status);

    Status getStatusById(Integer id);

    List<Status> getAllStatuses();

    Status updateStatus(Status status);

    void deleteStatus(Integer id);
}
