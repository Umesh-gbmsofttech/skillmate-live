package app.dto;

import app.entity.Meeting;

public class MeetingBatchDTO {
    private Meeting meeting;
    private Long batchId;

    public MeetingBatchDTO(Meeting meeting, Long batchId) {
        this.meeting = meeting;
        this.batchId = batchId;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }
}
