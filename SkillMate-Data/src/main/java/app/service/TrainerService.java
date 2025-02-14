package app.service;

import app.entity.Role;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.jwt.JwtResponse;
import app.repository.TrainerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    AuthService authService;

    public JwtResponse saveTrainer(Trainer trainer) {
        if(trainer.getRoles()==null){
            trainer.setRoles(new HashSet<>());
        }
        trainer.getRoles().add(Role.TRAINER);
        Trainer saved= trainerRepository.save(trainer);
        String token=authService.generateToken(authService.getTrainerUserDetails(saved));
        return JwtResponse.builder().token(token).userData(saved).build();
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}
