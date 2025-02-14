```mermaid
erDiagram
    TRAINER {
        int id
        string name
        string mobileNumber
        string workingStatus
        string experience
        string companyName
        string email
        string image
        string resume
        string address
        string qualification
        string[] technologies
        set-Role role
    }
    STUDENT {
        int id
        string name
        string mobileNumber
        string workingStatus
        string email
        string image
        string resume
        string address
        string qualification
        set-Role role
    }
    COURSE {
        int id
        string image
        string title
        string description
        int days
    }
    MEETING {
        int id
        int courseId
        datetime createdAt
        int duration
        string meetingLink
        time startTime
        time endTime
        string message
    }
    ENROLLMENT {
        int id
        int studentId
        int courseId
        date enrollmentDate
        string status
    }
    ASSIGNMENT {
        int id
        int trainerId
        int courseId
        date dueDate
    }
    MEETING_ATTENDANCE {
        int id
        int meetingId
        int studentId
        boolean attended
        time inTime
        time outTime
        string status
    }
    RATING_REVIEW {
        int id
        int studentId
        int courseId  
        int trainerId 
        int rating    
        string reviewText
        date reviewDate
    }

    
    CONTACTUS {
        int id
        string fullName
        string contactNumber
        string email
        string qualification
        string query
    }

    TRAINER ||--o{ COURSE : assigned_to
    COURSE ||--o{ ASSIGNMENT : taught_in
    STUDENT ||--o{ ENROLLMENT : enrolls
    COURSE ||--o{ ENROLLMENT : has
    COURSE ||--o{ MEETING : scheduled_for
    MEETING ||--o{ MEETING_ATTENDANCE : tracks
    STUDENT ||--o{ MEETING_ATTENDANCE : attends
    STUDENT ||--o{ RATING_REVIEW : writes
    TRAINER ||--o{ RATING_REVIEW : has
    COURSE ||--o{ RATING_REVIEW : has