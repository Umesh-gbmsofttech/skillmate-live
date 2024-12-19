package app.service;

import app.entity.Role;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    @Autowired
    private AuthService authService;  // Inject AuthService

    @Autowired
    private TrainerRepository trainerRepository;

    // Create a new Trainer with role
    public String createTrainer(Trainer trainer) {
        if (trainer.getRoles() == null) {
            trainer.setRoles(new HashSet<>());
        }
        trainer.getRoles().add(Role.TRAINER);
        Trainer savedTrainer = trainerRepository.save(trainer);

        // Generate JWT token for the saved trainer using AuthService
        return authService.generateToken(new org.springframework.security.core.userdetails.User(
                savedTrainer.getFullName(), 
                "", // Empty password as you might not be using passwords for trainers
                savedTrainer.getRoles().stream()
                    .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(role.name()))
                    .collect(Collectors.toList())
        ));
    }

    // Get all Trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // Get Trainer by ID
    public Optional<Trainer> getTrainerById(Long trainerId) {
        return trainerRepository.findById(trainerId);
    }

    // Update Trainer
    public Trainer updateTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Delete Trainer by ID
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}
