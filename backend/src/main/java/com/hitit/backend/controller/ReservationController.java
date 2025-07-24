package com.hitit.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.entity.Reservation;
import com.hitit.backend.repository.ReservationRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@RestController
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PersistenceContext
    private EntityManager entityManager;



    @PostMapping("/createres")
    @Transactional
    public ResponseEntity<Integer> createReservation(@RequestBody Reservation reservation) {
        if (reservationRepository.existsById(reservation.getPnr())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Reservation saved = reservationRepository.save(reservation);
        entityManager.refresh(saved);

        System.out.println("Generated pnr : " + saved.getPnr());

        Integer pnr = saved.getPnr();

        return ResponseEntity.ok(pnr);
        
    }
    















    
}
