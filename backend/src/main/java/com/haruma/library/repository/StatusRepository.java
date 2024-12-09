package com.haruma.library.repository;

import com.haruma.library.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Integer> {

    @Query("SELECT s FROM Status s WHERE s.statusId = :statusId")
    Optional<Status> findByStatusId(@Param("statusId") Integer statusId);

}
