package com.haruma.library.repository;

import com.haruma.library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from users u where u.email = :email", nativeQuery = true)
    Optional<User> findUserByEmail(@Param("email") String email);

    @Query(value="select count(*) from users as u inner join user_roles as ur on u.id = ur.id inner join role on role.role_id = ur.role_id where role.role_name = :role", nativeQuery = true)
    Long countUserByRole(@Param("role") String role);

}
