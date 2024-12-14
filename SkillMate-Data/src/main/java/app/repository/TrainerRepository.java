package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
}