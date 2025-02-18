package app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AssignmentRequest {
    private Long trainerId;
    private Long courseId;
    private LocalDate dueDate;
}
