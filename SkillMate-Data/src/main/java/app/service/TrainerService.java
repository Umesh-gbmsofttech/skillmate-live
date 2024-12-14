package app.service;

import app.entity.Trainer;
import app.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    // Create a new Trainer
    public Trainer createTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Get all Trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // Get Trainer by ID
    //for rating reviews
    public Optional<Trainer> getTrainerById(Long trainerId) {
        return  trainerRepository.findById(trainerId); // Handle null as necessary
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

    
 