package com.haruma.library.service.impl;

import com.haruma.library.entity.Status;
import com.haruma.library.repository.StatusRepository;
import com.haruma.library.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusServiceImplement implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImplement(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public Status addStatus(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Status getStatusById(Integer id) {
        return statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái với id: " + id));
    }

    @Override
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @Override
    public Status updateStatus(Status status) {
        var existingStatus = this.statusRepository.findById(status.getStatusId());
        if (existingStatus.isEmpty()) {
            throw new RuntimeException("Không tìm thấy trạng thái");
        }
        return statusRepository.save(status);
    }

    @Override
    public void deleteStatus(Integer id) {
        if (!statusRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy trạng thái với id: " + id);
        }
        statusRepository.deleteById(id);
    }


}
