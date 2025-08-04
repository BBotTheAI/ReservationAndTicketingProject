package com.hitit.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.dto.FlightSearchDto;
import com.hitit.backend.entity.Flight;
import com.hitit.backend.entity.FlightId;
import com.hitit.backend.entity.ReservationFlight;
import com.hitit.backend.entity.ReturnReservationFlight;
import com.hitit.backend.repository.FlightRepository;
import com.hitit.backend.repository.ReservationFlightsRepository;
import com.hitit.backend.repository.ReturnReservationFlightsRepository;



@RestController
public class FlightController {


    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private ReservationFlightsRepository reservationFlightsRepository;

    @Autowired
    private ReturnReservationFlightsRepository returnReservationFlightRepository;

    
    @GetMapping("/searchflightno/{pnr}")
    public ResponseEntity<Flight> getFlightfromPNR(@PathVariable int pnr) {
        Optional<ReservationFlight> optional = reservationFlightsRepository.findById(pnr);

        ReservationFlight resFlight;

        if (optional.isPresent()) {
            resFlight = optional.get();            
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();        
        }
        
        

        FlightId flightId = new FlightId();
        flightId.setCabin(resFlight.getCabin());
        flightId.setFlightno(resFlight.getFlightno());

        Optional<Flight> optFlight = flightRepository.findById(flightId);

        if (optFlight.isPresent()) {
            return ResponseEntity.ok(optFlight.get());        
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();        
        }
       
    }

    @GetMapping("/returnflight/{pnr}")
    public ResponseEntity<Flight> getReturnFlightfromPNR(@PathVariable int pnr) {
        Optional<ReturnReservationFlight> optional = returnReservationFlightRepository.findById(pnr);

        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        ReturnReservationFlight resFlight = optional.get();

        FlightId flightId = new FlightId();
        flightId.setCabin(resFlight.getCabin());
        flightId.setFlightno(resFlight.getFlightno());

        Optional<Flight> optFlight = flightRepository.findById(flightId);

        return optFlight.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    @PostMapping("/flight/search")
    public ResponseEntity<List<Flight>> searchFlights(@RequestBody FlightSearchDto flightSearchDto) {
        List<Flight> flights = flightRepository.findFlights(
            flightSearchDto.getDepartureport(),
            flightSearchDto.getArrivalport(),
            flightSearchDto.getDate()
        );
        
        return ResponseEntity.ok(flights);
    }
    
    
}
