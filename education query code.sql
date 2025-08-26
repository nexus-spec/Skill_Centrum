CREATE TABLE educations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school VARCHAR(150) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    fieldOfStudy VARCHAR(150) NOT NULL,  -- Matches entity @Column({ name: 'fieldOfStudy' })
    startDate DATE NOT NULL,             -- Matches entity @Column({ name: 'startDate' })
    endDate DATE NULL,                   -- Matches entity @Column({ name: 'endDate' })
    present BOOLEAN DEFAULT FALSE,
    applicantId INT NOT NULL,            -- Matches entity @Column({ name: 'applicantId' })
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_educations_applicant 
    FOREIGN KEY (applicantId) 
    REFERENCES applicants(id) 
    ON DELETE CASCADE
);
