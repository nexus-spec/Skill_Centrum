import { Applicant } from 'src/applicants/applicant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('work_experience')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Applicant, (applicant) => applicant.workExperiences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @Column()
  position: string;

  @Column()
  companyName: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column('text')
  task: string;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
