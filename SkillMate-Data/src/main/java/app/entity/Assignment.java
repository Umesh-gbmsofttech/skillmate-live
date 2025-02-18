package app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String title;
    private String description;
    private LocalDate dueDate;

    @OneToMany(mappedBy = "assignment")
    private List<AssignmentStatus> assignmentStatuses;
}
