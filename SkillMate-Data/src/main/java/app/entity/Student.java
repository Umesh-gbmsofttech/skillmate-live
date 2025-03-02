package app.entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityResult;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SqlResultSetMapping(name = "StudentMapping", entities = @EntityResult(entityClass = Student.class))
@NamedNativeQuery(name = "BatchRepository.findStudentsByBatchId", query = "SELECT s.* FROM student s " +
        "JOIN batch_students bs ON s.id = bs.student_id " +
        "WHERE bs.batch_id = :batchId", resultSetMapping = "StudentMapping")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mobileNumber;
    private String workingStatus;
    private String email;

    @Lob
    private byte[] image;

    @Lob
    private byte[] resume;

    private String address;
    private String qualification;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Enrollment> enrollments;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Attendance> attendances;

    @OneToMany(mappedBy = "student")
    // @JsonIgnore
    private List<AssignmentStatus> assignmentStatuses;

}
