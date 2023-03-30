package com.example.mymaps.repository;

import com.example.mymaps.entity.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MapRepo extends JpaRepository<Map, UUID> {

    Optional<Map> findById(UUID uuid);

}
