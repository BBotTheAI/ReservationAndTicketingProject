package com.hitit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hitit.backend.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    
    
}