package com.haruma.library.repository;

import com.haruma.library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from users u where u.email = :email", nativeQuery = true)
    User findUserByEmail(@Param("email") String email);

    @Query(value="select count(*) from users as u inner join user_detail as ud on u.id = ud.user_id where ud.role = :role", nativeQuery = true)
    Long countUserByRole(@Param("role") String role);

}
